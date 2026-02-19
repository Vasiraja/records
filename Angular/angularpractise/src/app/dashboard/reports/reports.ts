import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  imports: [],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  constructor(private router:Router){}

  logoutdashboard(){
    localStorage.setItem("isLoggedIn","false");
this.router.navigate(["/dashboard"])
    

  }
}
