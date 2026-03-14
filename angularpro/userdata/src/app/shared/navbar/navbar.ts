import { Component, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { Socketserv } from '../../services/socket/socketserv';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  currentUser: string = '';

  constructor(private router: Router, private socketcon: Socketserv) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('userType') || 'Admin';
    console.log(this.currentUser)
  }
  get userInitial(): any {
    if (this.currentUser) {
      return this.currentUser.charAt(0).toUpperCase();
    }
  }
  async logout() {
    const user = localStorage.getItem('user')

    if (user && this.socketcon.socket) {
      this.socketcon.socket.emit('userLogout', user)
    }

    this.socketcon.disconnect()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('pollid')
    localStorage.removeItem('userType')
    localStorage.removeItem("selectedUser")
    this.router.navigate(['/login'])
  }

}
