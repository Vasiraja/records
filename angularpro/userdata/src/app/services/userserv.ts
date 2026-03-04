import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse, User, LoginLog } from '../models/types';   

@Injectable({ providedIn: 'root' })
export class Userserv {

  private apiUrl = "http://localhost:3030";

  private loginWatch = new BehaviorSubject<boolean>(false);
  loginWatch$ = this.loginWatch.asObservable();

  constructor(private http: HttpClient) {}

  notifyLogin() {
    this.loginWatch.next(true);
  }

   getData(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/userdet?$limit=50`);
  }

   getLogs(): Observable<ApiResponse<LoginLog[]>> {
    return this.http.get<ApiResponse<LoginLog[]>>(`${this.apiUrl}/logs?$limit=40`);
  }

   updateData(id: string, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/userdet/${id}`, userData);
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
    return this.http.get<User>(`${this.apiUrl}/userdet/${id}`);
  }

   postData(userDetails: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/userdet`, userDetails);
  }

   deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/userdet/${id}`);
  }
}