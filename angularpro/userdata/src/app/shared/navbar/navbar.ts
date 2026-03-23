import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Socketserv } from '../../services/socket/socketserv';
import { Userserv } from '../../services/userserv';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {
  currentUser: string = '';
  userName: string = '';

  constructor(private router: Router, private socketcon: Socketserv, private userServ: Userserv) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('userType') || 'Guest';

    const userId = localStorage.getItem('user');
    if (userId) {
      this.userServ.getNames(userId).subscribe({
        next: (data: any) => {
          this.userName = data?.firstname || this.currentUser;
        },
        error: () => {
          this.userName = this.currentUser;
        }
      });
    }
  }

  get userInitial(): string {
    const name = this.userName || this.currentUser;
    return name.charAt(0).toUpperCase();
  }

  async logout() {
    const user = localStorage.getItem('user');
    if (user && this.socketcon.socket) {
      this.socketcon.socket.emit('userLogout', user);
    }
    this.socketcon.disconnect();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('pollid');
    localStorage.removeItem('userType');
    localStorage.removeItem('selectedUser');
    this.router.navigate(['/login']);
  }
}