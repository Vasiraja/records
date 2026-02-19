import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-analytics',
  imports: [],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class Analytics {
constructor(private router:Router){}

  logoutdashboard(){
    localStorage.setItem("isLoggedIn","false");
    this.router.navigate(["/dashboard"])


  }
}
