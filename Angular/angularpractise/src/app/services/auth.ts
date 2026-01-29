import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  isLoggedIn=false;

  login(){
    this.isLoggedIn=true;
  }
  logout(){
    this.isLoggedIn=false;
  }
   isAuthenticated() {
     console.log('Auth check:', this.isLoggedIn);
     return this.isLoggedIn;
  }
 
  
}
