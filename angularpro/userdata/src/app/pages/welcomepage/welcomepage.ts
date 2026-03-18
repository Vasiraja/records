import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Userserv } from '../../services/userserv';
import { jwtDecode } from 'jwt-decode';
import { Accesscontrol } from '../../services/accesscontrol';
import { User } from '../../models/types';
import { Router } from '@angular/router';
import { Socketserv } from '../../services/socket/socketserv';
import { Roleanalysis } from '../../components/roleanalysis/roleanalysis';
import { BulkRolePopup } from '../../components/bulk-role-popup/bulk-role-popup';


@Component({
  selector: 'app-welcomepage',
  imports: [FormsModule, CommonModule, Roleanalysis, BulkRolePopup],

  templateUrl: './welcomepage.html',
  styleUrl: './welcomepage.css',
})
export class Welcomepage implements OnInit, OnDestroy {

  users = signal<any[]>([]);
  userData: any = {};
  polls = signal<any[]>([]);
  currentUserId: string = localStorage.getItem('user') || '';
  userTypeView: any = "";
  showBulkPopup = false;

  openBulkGuestPopup() {
    this.showBulkPopup = true;
  }
  showDeletePopup = false;
  deleteUserId: string | null = null;

  closeBulkGuestPopup() {
    this.showBulkPopup = false;
  }
  constructor(private userdetService: Userserv, private accessControl: Accesscontrol, private router: Router, private cdr: ChangeDetectorRef, private socketcon: Socketserv) { }
  ngOnDestroy(): void {
    const client = this.socketcon.getClient()

    if (client) {
      client.service('users').removeAllListeners('patched')
    }
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
        this.userTypeView = localStorage.getItem('userType');
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
    this.fetchMyPolls();
    this.getCurrentAdminType();



    const client = this.socketcon.getClient()

    if (!client) return

    window.addEventListener('beforeunload', () => {

      const token = localStorage.getItem('token')
      if (!token) return

      const decoded: any = jwtDecode(token)
      const userId = decoded.sub

      // client.io.emit('userLogout', userId)

    })

    client.service('users').on('patched', (updatedUser: any) => {

      if (!updatedUser || typeof updatedUser !== 'object' || Array.isArray(updatedUser)) {
        this.fetching();
        return;
      }

      const currentUsers = this.users();

      const updated = currentUsers.map((u: any) =>
        u._id === updatedUser._id
          ? { ...u, ...updatedUser }
          : u
      );

      this.users.set(updated);
      this.cdr.detectChanges();
    })




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
  fetchMyPolls() {
    this.userdetService.getPolls().subscribe({
      next: (res: any) => {
        const allmypolls = res?.data || [];
        this.polls.set(allmypolls.filter((p: any) =>{ 
          console.log(p.createdBy);
          console.log(this.currentUserId);
          
          return p.createdBy === this.currentUserId
        }));
        
        this.cdr.detectChanges();
        console.log(res)
      },
      error: (err) => console.error('Polls fetch error:', err)
    });
  }

  getTimeLeft(expiresAt: string): string {
    const remaining = new Date(expiresAt).getTime() - Date.now();
    if (remaining <= 0) return 'Expired';
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    return h > 0 ? `${h}h ${m}m left` : `${m}m left`;
  }
  confirmDelete(id: string) {
    this.deleteUserId = id;
    this.showDeletePopup = true;
  }
  deleteConfirmed() {

    if (!this.deleteUserId) return;

    this.userdetService.deleteUser(this.deleteUserId).subscribe({
      next: () => {
        this.fetching();
        this.showDeletePopup = false;
        this.deleteUserId = null;
      },
      error: (err) => console.error(err)
    });

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