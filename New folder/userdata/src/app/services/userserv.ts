import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class Userserv {

  private apiUrl = "http://localhost:3030";

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    try {
      const result = this.http.get(`${this.apiUrl}/userdet`);
      console.log(result)
      return result;

    }
    catch (error) {
      console.error(error);
      throw error
    }


  }
  updateData(id: any, userData: any): Observable<any> {
    try {
      const result = this.http.patch(`${this.apiUrl}/userdet/${id}`, userData);

      return result
    }
    catch (error) {
      console.error(error);
      throw error
    }
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  login(email: any, password: any): Observable<any> {

    try {
      const loginres = this.http.post(`http://localhost:3030/authentication`, {strategy:"local",email, password});
      return loginres;
    }
    catch (err) {
      console.error(err);
      throw err
    }


  }
  getType(id:any):Observable<any>{

    try{
      const getType = this.http.get(`${this.apiUrl}/userdet/${id}`);
      return getType;
    }
    catch(error){
      console.error(error);
      throw error
    }
  }
  postData(userDetails:any):Observable<any>{

    try{
      const getType = this.http.post(`${this.apiUrl}/userdet`,userDetails);
      return getType;
    }
    catch(error){
      console.error(error);
      throw error
    }
  }
  deleteUser(id:any):Observable<any>{
    try{
      const delType = this.http.delete(`${this.apiUrl}/userdet/${id}`);
      return delType
    }
    catch(error){
      console.error(error);
      throw error;
    }
  }

}
