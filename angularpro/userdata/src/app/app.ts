import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Userserv } from './services/userserv';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 import { Toast } from './shared/toast/toast';
import { Socketserv } from './services/socket/socketserv';
import { Socket } from 'socket.io-client';
  
 @Component({
  selector: 'app-root',
  standalone: true, // Angular 18 uses standalone by default
  imports: [RouterOutlet, CommonModule, FormsModule, Toast],
  templateUrl: './app.html',
})
export class App implements OnInit  {
  constructor(private socketserv:Socketserv){}
   ngOnInit(): void {
      const token = localStorage.getItem('token') 
      if(token){
    this.socketserv.connect();
   }
   }
  


}
 
