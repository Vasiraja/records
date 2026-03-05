import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Userserv } from '../../services/userserv';
import { Router } from '@angular/router';
import { Toast } from '../../shared/toast/toast';


@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [FormsModule, CommonModule, Toast],
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.css',
})
export class Loginpage {

  constructor(private userservice: Userserv, private router: Router, private cdr: ChangeDetectorRef) { }

  loginEmail: string = "";
  loginPassword: string = "";
  firstname: string = "";
  age: number | null = null;


  formState: "login" | "signup" = "login";

  @ViewChild('loginForm')
  loginForm!: NgForm;
  @ViewChild(Toast) toast!: Toast;


  submitLogin() {

    if (!this.loginEmail || !this.loginPassword) {
      alert("Please enter email and password");
      return;
    }

    this.userservice.login(this.loginEmail, this.loginPassword).subscribe({
      next: (res: any) => {



        this.toast.showToast("Success", "Login Successfully");

        localStorage.setItem("token", res.accessToken);
        this.userservice.notifyLogin();

        setTimeout(() => {
          this.router.navigate(['/welcome']);
        }, 1000);

      },
      error: (err: any) => {
        console.error("Login Error:", err.error);
      }
    });
  }

  toggleState() {
    this.formState = this.formState === "login" ? "signup" : "login";
    this.firstname = "";
    this.loginEmail = "";
    this.age = null;
    this.loginPassword = "";
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
        this.toast.showToast("Success", "Signup completed successfully");

        this.loginForm.resetForm();

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