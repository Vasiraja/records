import { Component, signal, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Userserv } from './services/userserv';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Toast } from './shared/toast/toast';
import { Socketserv } from './services/socket/socketserv';
import { Socket } from 'socket.io-client';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, CommonModule, FormsModule, Toast, Sidebar, Navbar],
  templateUrl: './app.html',
})
export class App implements OnInit {

  isLoginRoute = false;

  constructor(private socketserv: Socketserv, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Current route:', event.urlAfterRedirects);
        this.isLoginRoute = event.urlAfterRedirects === '/login';
      }
    });
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if (token) {
      this.socketserv.connect();
    }
  }



}

