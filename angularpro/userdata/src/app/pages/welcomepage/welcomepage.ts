import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
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
  isSuperAdmin: boolean | undefined;


  openBulkGuestPopup() {
    this.showBulkPopup = true;
  }
  showDeletePopup = false;
  deleteUserId: string | null = null;

  closeBulkGuestPopup() {
    this.showBulkPopup = false;
  }
  constructor(private userdetService: Userserv, private accessControl: Accesscontrol, private router: Router, private cdr: ChangeDetectorRef, private socketcon: Socketserv, private zone: NgZone) { }
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
        this.userTypeView = role;

        this.isSuperAdmin = res.isSuperAdmin === true;

        this.accessControl.refreshRole();
        this.cdr.detectChanges();
      },
      error: () => {
        localStorage.setItem('userType', 'guest');
        this.isSuperAdmin = false;
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

  pagePerUserCount = 8;

  get pageUsers() {
    return this.users().length;
  }

  get noOfPages() {
    const totalusers: number = this.users().length;
    return Math.ceil(totalusers / this.pagePerUserCount);
  }
  currentPage = 1;


  get getPaginateUsers() {

    const start = (this.currentPage - 1) * this.pagePerUserCount;
    const end = start + this.pagePerUserCount;
    return this.users().slice(start, end);

  }
  get paginateButtons() {
    let overallButtons: number[] = [];

    for (let i = 1; i <= this.noOfPages; i++) {
      overallButtons.push(i);

    }
    return overallButtons;
  }

  gotoPage(page: number) {

    if (page < 1 || page > this.noOfPages) return
    this.currentPage = page;

  }

  goToNext() {
    if (this.currentPage < this.noOfPages) {
      this.currentPage++;
    }


  }
  goToPrev() {
    if (this.currentPage > 1) {
      this.currentPage--

    }
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

    this.socketcon.userService().on('patched', (updatedUser: any) => {
      this.users.set(
        this.users().map((u: any) =>
          u._id === updatedUser._id ? updatedUser : u
        )
      )
    })
    this.socketcon.userService().on('removed', (deletedUser: any) => {
      this.zone.run(() => {
        this.users.set(
          this.users().filter((u: any) => u._id !== deletedUser._id)
        )
        this.cdr.detectChanges()
      })
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
  fetchMyPolls(): void {
    this.userdetService.getMyPolls(this.currentUserId).subscribe({
      next: (res: any) => {
        const allPolls = Array.isArray(res) ? res : res?.data ?? [];
        this.polls.set(allPolls);
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Polls fetch error:', err)
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


  downloadUsersAsXML() {
    const usersData = this.users();

    const xmlRows = usersData.map(user => `
    <user>
      <id>${user._id ?? ''}</id>
      <firstname>${user.firstname ?? ''}</firstname>
      <email>${user.email ?? ''}</email>
      <age>${user.age ?? ''}</age>
      <userType>${user.userType ?? ''}</userType>
    </user>`).join('');

    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n<users>${xmlRows}\n</users>`;

    const blob = new Blob([xmlString], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.xml';
    a.click();

    URL.revokeObjectURL(url);
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