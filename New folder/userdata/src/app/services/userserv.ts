import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class Userserv {
  
  private apiUrl = "http://localhost:3030";

constructor(private http:HttpClient){}

  getData():Observable<any> {
    try{
      const result =  this.http.get(`${this.apiUrl}/userdet`);
      return result;

    } 
    catch(error){
      console.error(error);
      throw error
    }
 

  }


}
