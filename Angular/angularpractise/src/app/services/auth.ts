import { Injectable, signal } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  userRole = signal<'admin' | 'user'>('user');

  isLoggedIn = false;
  getUserProfile(id: string) {
    return of({ id, name: 'ravi', domain: 'Angular',department:"Development" }).pipe(delay(3000));
  }
  login() {
    this.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");

  }
  logout() {
    this.isLoggedIn = false;
    localStorage.setItem("isLoggedIn", "false");

  }


  isAuthenticated() {
    this.isLoggedIn = false;
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    return this.isLoggedIn;
  }


  isAdmin() {
    return this.userRole() === 'admin';
  }
}
