import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Userserv } from '../../services/userserv';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.css',
})
export class Loginpage {

  constructor(private userservice: Userserv, private router: Router) {}

  loginEmail: string = "";
  loginPassword: string = "";
  firstname: string = "";
  age: number | null = null;

  formState: "login" | "signup" = "login";

   submitLogin() {

    if (!this.loginEmail || !this.loginPassword) {
      alert("Please enter email and password");
      return;
    }

    this.userservice.login(this.loginEmail, this.loginPassword).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.accessToken);
        console.log("Login Successfully");
        this.router.navigate(['/welcome']);
      },
      error: (err: any) => {
        console.error("Login Error:", err.error);
      }
    });
  }

   toggleState() {
    this.formState = this.formState === "login" ? "signup" : "login";
    this.firstname="";
    this.loginEmail="";
    this.age=null;
    this.loginPassword="";
  }

   submitSignup() {

    if (!this.firstname || !this.loginEmail || !this.loginPassword) {
      alert("Please fill all required fields");
      return;
    }

    const userData = {
      firstname: this.firstname,
      email: this.loginEmail,
      age: this.age ? Number(this.age) : null,
      password: this.loginPassword,
      userType: "User"
    };

    console.log(userData);

    this.userservice.postData(userData).subscribe({
      next: (res: any) => {
        console.log("Signup Successfully", res);
        alert("Signup Successfully");

         this.firstname = "";
        this.loginEmail = "";
        this.loginPassword = "";
        this.age = null;

        this.formState = "login";
      },
      error: (err: any) => {
        console.error("Signup Error:", err.error);
      }
    });
  }
}