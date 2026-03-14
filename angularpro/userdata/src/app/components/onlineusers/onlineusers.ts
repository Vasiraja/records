import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { onlineUser } from '../../models/types';
import { Userserv } from '../../services/userserv';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onlineusers',
  imports: [FormsModule,CommonModule],
  templateUrl: './onlineusers.html',
  styleUrl: './onlineusers.css',
})
export class Onlineusers implements OnInit,OnDestroy {
onlineUsers: onlineUser[] = [];
  private sub!: Subscription;

  constructor(private onlineUsersService: Userserv) {}

  ngOnInit() {
     this.sub = this.onlineUsersService.onlineUsers
      .subscribe(users => this.onlineUsers = users);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();  
  }
  trackById(index: number, item: any) {
  return item.id;
}

}
