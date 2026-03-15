import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse, User, LoginLog, onlineUser, Polls } from '../models/types';
import { Socketserv } from './socket/socketserv';
import { Application } from '@feathersjs/feathers';

@Injectable({ providedIn: 'root' })
export class Userserv {

  private apiUrl = "http://localhost:3030";

  private onlineUsers$ = new BehaviorSubject<onlineUser[]>([]);
  onlineUsers = this.onlineUsers$.asObservable();
  onlineCount = 0;


  private loginWatch = new BehaviorSubject<boolean>(false);
  loginWatch$ = this.loginWatch.asObservable();
  private totalVotess = new BehaviorSubject<number>(0);
  totalVotess$ = this.totalVotess.asObservable();

  constructor(private http: HttpClient, private socketServ: Socketserv) {
    // this.listenToEvents();
  }

  notifyLogin() {
    this.loginWatch.next(true);
  }
  notifyLogOut() {
    this.loginWatch.next(false);
  }

  getData(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users?$limit=50`);
  }
  getNames(userId: string): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users/${userId}`);
  }

  getLogs(): Observable<ApiResponse<LoginLog[]>> {
    return this.http.get<ApiResponse<LoginLog[]>>(`${this.apiUrl}/logs`);
  }

  postLogs(logPayload: any): Observable<ApiResponse<LoginLog[]>> {
    return this.http.post<ApiResponse<LoginLog[]>>(`${this.apiUrl}/logs`, logPayload);
  }
  getPolls(): Observable<ApiResponse<LoginLog[]>> {

    const usertype = localStorage.getItem('userType') || 'guest';

    return this.http.get<ApiResponse<LoginLog[]>>(
      `${this.apiUrl}/polls?$limit=50`,
      {
        headers: {
          usertype: usertype
        }
      }
    );
  }

  updateData(id: string, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}`, userData);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authentication`, {
      strategy: "local", email, password
    });
  }

  getType(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  postData(userDetails: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, userDetails);
  }
  postPolls(polldetails: Partial<Polls>): Observable<Polls> {
    return this.http.post<Polls>(`${this.apiUrl}/polls`, polldetails);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`);
  }

  isUserOnline(userId: string): boolean {
    return this.onlineUsers$.value
      .some(user => user.userId === userId);
  }


  totalVotes(totalV: number) {
    this.totalVotess.next(totalV)

  }
  getVotes(): any {
    return this.totalVotess;
  }
  hidePoll(id: string) {

    const userId = localStorage.getItem('user');

    return this.http.patch(
      `${this.apiUrl}/polls/${id}`,
      { hidden: true },
      {
        headers: {
          userid: String(userId)
        }
      }
    );
  }

  deletePoll(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/polls/${id}`);
  }
  getGuests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?userType=Guest&$limit=100`);
  }

 bulkUpdateUsers(ids: string[], role: string): Observable<any> {

  let params = new HttpParams();

  ids.forEach(id => {
    params = params.append('_id[$in][]', id);
  });

  return this.http.patch(
    `${this.apiUrl}/users`,
    { userType: role },
    { params }
  );
}
}  