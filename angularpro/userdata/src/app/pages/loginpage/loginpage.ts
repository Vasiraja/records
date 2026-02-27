import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Userserv } from '../../services/userserv';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginpage',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.css',
})
export class Loginpage {

  constructor(private userservice: Userserv, private router: Router) { }



  loginEmail: string = "";
  loginPassword: string = "";

  submitForm() {
    this.userservice.login(this.loginEmail, this.loginPassword).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.accessToken);
        console.log("Login Successfully");
        this.router.navigate(['/welcome']);


      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

}
