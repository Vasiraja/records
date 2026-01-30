import { Component } from '@angular/core';
import {   Router } from '@angular/router';
import { Auth } from '../services/auth';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  name:string='';
  saved=false;

   

  constructor(private router:Router,private auth:Auth){

  }
   isDirty = false;

  markDirty() {
    this.isDirty = true;  
  }

  save() {
    this.isDirty = false;  
    alert('Saved!');
  }
 

  login(){
    this.auth.login();
    this.router.navigate(['/success']);
    
  }
   logindashboard() {
    this.auth.login();
    this.router.navigate(['/dashboard/reports']);  
  }
 
}
