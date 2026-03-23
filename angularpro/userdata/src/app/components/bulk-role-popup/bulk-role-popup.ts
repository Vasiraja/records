import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Userserv } from '../../services/userserv';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Toast } from '../../shared/toast/toast';


@Component({
  selector: 'app-bulk-role-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './bulk-role-popup.html',
  styleUrl: './bulk-role-popup.css',
})
export class BulkRolePopup implements OnInit {

  @Output() closePopup = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();
  @ViewChild(Toast) toast!: Toast;

  users: any[] = [];
  selectedUsers: string[] = [];
  selectedRole: string = 'User';
  loading = true;

  constructor(private userServ: Userserv) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {

    this.loading = true;

    this.userServ.getUsersConverAdmin().subscribe({
      next: (res: any) => {

        console.log("Users response:",res);

        if (res && res.data) {
          this.users = res.data;
        } else {
          this.users = [];
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('User fetch error:', err);
        this.loading = false;
      }
    });
  }

  toggleUser(id: string, event: Event) {

    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!this.selectedUsers.includes(id)) {
        this.selectedUsers.push(id);
      }
    } else {
      this.selectedUsers =
        this.selectedUsers.filter(userId => userId !== id);
    }

  }

  selectAll(event: Event) {

    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedUsers = this.users.map(user => user._id);
    } else {
      this.selectedUsers = [];
    }

  }

  isChecked(id: string): boolean {
    return this.selectedUsers.includes(id);
  }

  applyRoleChange() {

    console.log("Selected users:", this.selectedUsers);
    console.log("New role:", this.selectedRole);

    this.userServ
      .bulkUpdateUsers(this.selectedUsers, this.selectedRole)
      .subscribe({
        next: (res) => {
          console.log("Bulk update response:", res);

          this.toast.showToast("success", "Successfully Updated")
          this.updated.emit();
          this.close();
        },
        error: (err) => {
          console.error('Bulk update error:', err);
        }
      });

  }

  close() {
    this.closePopup.emit();
  }

}