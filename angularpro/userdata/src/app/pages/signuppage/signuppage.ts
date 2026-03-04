import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Userserv } from '../../services/userserv';
import { Router } from '@angular/router';
import { User } from '../../models/types';


@Component({
  selector: 'app-signuppage',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signuppage.html',
  styleUrl: './signuppage.css',
})
export class Signuppage {
  constructor(private serviceUser: Userserv, private router: Router) { }

  formSignup = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.maxLength(4)]),
    email: new FormControl("", [Validators.required, Validators.email]),
 age: new FormControl<number | null>(null, [Validators.required, Validators.min(10)]),
    password: new FormControl("", [Validators.required])
  })

  submitform() {

    console.log(this.formSignup.value);
    const userData = { ...this.formSignup.value, userType: "User" } as User;
    console.log(userData)


    this.serviceUser.postData(userData).subscribe({
      next: (res: User) => {

        console.log("Posted Successfully", res);
        alert("Signup Successfully")
        this.router.navigate(['/login']);

      },
      error: (err: any) => {
        console.error(err)
      }
    })



  }

}
