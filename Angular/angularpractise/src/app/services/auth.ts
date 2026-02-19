import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  isLoggedIn=false;

  login(){
    this.isLoggedIn=true;
    localStorage.setItem("isLoggedIn","true");

  }
  logout(){
    this.isLoggedIn=false;
        localStorage.setItem("isLoggedIn","false");

  }
   isAuthenticated() {
     this.isLoggedIn=false;
     this.isLoggedIn=localStorage.getItem("isLoggedIn") === "true"

     
     return this.isLoggedIn;
  }
 
  
}
