import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Userserv } from '../../services/userserv';
import { jwtDecode } from 'jwt-decode';
import { Accesscontrol } from '../../services/accesscontrol';
import { User } from '../../models/types';
import { Roleanalysis } from '../../components/roleanalysis/roleanalysis';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcomepage',
  imports: [FormsModule, CommonModule, Roleanalysis],

  templateUrl: './welcomepage.html',
  styleUrl: './welcomepage.css',
})
export class Welcomepage implements OnInit {

  users = signal<any[]>([]);
  userData: any = {};


  constructor(private userdetService: Userserv, private accessControl: Accesscontrol,private router:Router, private cdr: ChangeDetectorRef) { }
  logout() {
    localStorage.removeItem("token");
    this.userdetService.notifyLogOut();
    this.router.navigate(['/login']);
    this.cdr.detectChanges();
  }

  getCurrentAdminType() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded: any = jwtDecode(token);
    const userId = decoded.sub;

    this.userdetService.getType(userId).subscribe({
      next: (res: any) => {
        const role = res.userType?.trim().toLowerCase();
        localStorage.setItem('userType', role);
        this.accessControl.refreshRole();
        this.cdr.detectChanges()
      },
      error: () => {
        localStorage.setItem('userType', 'guest');
        this.accessControl.refreshRole();
        this.cdr.detectChanges();

      }
    });
  }
  get isAdmin(): boolean {
    return this.accessControl.isAdmin();

  }
  get isGuest(): boolean {
    return this.accessControl.isGuest();
  }
  get isUser(): boolean {
    return this.accessControl.isUser();
  }
  get canDelete(): boolean {
    return this.accessControl.canDelete();
  }
  get canEdit(): boolean {
    return this.accessControl.canEdit();
  }


  ngOnInit(): void {
    this.fetching();

    this.getCurrentAdminType()





  }

  editId: string | null = null;
  userTypes = ['Admin', 'User', 'Guest'];

  formInputs: Partial<User> = {
    firstname: "",
    email: "",
    userType: "",
    age: 0

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
        this.cdr.detectChanges();
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

    const updatedUser: Partial<User> = {
      ...this.formInputs,
      age: Number(this.formInputs.age)
    };

    this.userData = updatedUser;

    this.userdetService.updateData(id, this.userData).subscribe({
      next: (res: User) => {
        console.log(res.firstname);

        console.log("Updated successfully", res);
        this.cdr.detectChanges();
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