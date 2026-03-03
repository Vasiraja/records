import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Userserv } from '../../services/userserv';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-welcomepage',
  imports: [FormsModule, CommonModule],

  templateUrl: './welcomepage.html',
  styleUrl: './welcomepage.css',
})
export class Welcomepage implements OnInit {

  users = signal<any[]>([]);
  userData: any = {};
  // users:any[]=[];
  isAdmin = false;
  isLoaded = false;

  constructor(private userdetService: Userserv) { }


  getCurrentAdminType() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.isLoaded = true;
      return;
    }

    const decoded: any = jwtDecode(token);
    const userId = decoded.sub;

    this.userdetService.getType(userId).subscribe({
      next: (res: any) => {

        this.isAdmin = res.userType?.trim().toLowerCase() === "admin";
        console.log(res.userType?.trim().toLowerCase())
        this.isLoaded = true;
        // console.log("isAdmin:", this.isAdmin);
        // console.log("isLoaded:", this.isLoaded);
      },
      error: () => {
        this.isLoaded = true;
      }
    });
  }

  ngOnInit(): void {
    this.fetching();

    this.getCurrentAdminType()





  }

  editId: string | null = null;
  userTypes = ['Admin', 'User', 'Guest'];

  formInputs: any = {
    firstname: "",
    email: "",
    userType: "",
    age: ""

  }
  editUser(index: any) {


    const selectedUser = this.users().filter((item) => item._id === index);
    console.log(selectedUser)
    if (selectedUser) {

      this.formInputs.firstname = selectedUser[0].firstname;
      this.formInputs.email = selectedUser[0].email;
      this.formInputs.age = selectedUser[0].age;
      this.formInputs.userType = selectedUser[0].userType;

      this.editId = index;


    }

  }
  delUser(id: any) {
    this.userdetService.deleteUser(id).subscribe({
      next: (res: any) => {
        console.log("Deleted successfully", res);
        this.fetching();
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
  usertypechange(id: any) {
    console.log(id);

  }


  updateUser(id: any) {

    const updatedUser = {
      ...this.formInputs,
      age: parseInt(this.formInputs.age)
    };

    this.userData = updatedUser;

    this.userdetService.updateData(id, this.userData).subscribe({
      next: (res: any) => {
        console.log("Updated successfully", res);
        this.editId = null;

        if (this.editId === null) {
          this.fetching();

        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }



  fetching() {
    this.userdetService.getData().subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.users.set(res.data);
        }
      },
      error: (err) => console.error('Fetch error:', err)
    });
  }
}