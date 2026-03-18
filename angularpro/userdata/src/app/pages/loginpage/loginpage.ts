import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Userserv } from '../../services/userserv';
import { Router } from '@angular/router';
import { Toast } from '../../shared/toast/toast';
import { Socketserv } from '../../services/socket/socketserv';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [FormsModule, CommonModule, Toast],
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.css',
})
export class Loginpage {

  constructor(private userservice: Userserv, private router: Router, private socketServ: Socketserv,private cdr:ChangeDetectorRef) { }

  loginEmail: string = "";
  loginPassword: string = "";
  firstname: string = "";
  age: number | null = null;


  formState: "login" | "signup" = "login";

   loginForm!: NgForm;
  @ViewChild(Toast) toast!: Toast;


async submitLogin() {
  if (!this.loginEmail || !this.loginPassword) {
    this.toast.showToast("Error", "Please enter email and password");
    return;
  }

  this.userservice.login(this.loginEmail, this.loginPassword).subscribe({
    next: (res: any) => {
      console.log(res);
        console.log("Login triggered");


      this.toast.showToast("Success", "Login Successfully");
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("user", res.user._id);

      this.socketServ.connect();

      this.userservice.notifyLogin();

      const logPayload = {
        userId: res.user._id,
        loginAt: new Date().toISOString()
      };

    

      this.router.navigate(['/']);
    },

    error: (err: any) => {
      console.error("Login Error:", err);
      this.toast.showToast("Login Failed", "Invalid email or password");
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

 
    this.userservice.postData(userData).subscribe({
      next: async (res: any) => {
        console.log(res)
        localStorage.setItem("token", res.accessToken);
        console.log(res)
        localStorage.setItem("user", JSON.stringify(res.data));
        this.userservice.notifyLogin();
        this.formState='login';
        if(this.formState === "login"){
          this.cdr.detectChanges();
        } 

        //  await this.socketServ.connect();
        // await this.socketServ.service('online-users').create({
        //   userId: res.data._id, 
        //   firstname: res.data.firstname,
        //   connectedAt: new Date().toISOString()
        // });  

        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err: any) => {
        console.error("Signup Error:", err.error);
      }
    });
  }
}