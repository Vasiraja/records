import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Socketserv } from '../../services/socket/socketserv';
import { Chat } from '../../services/chat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.html',
  styleUrls: ['./messages.css']
})
export class Messages implements OnInit, AfterViewChecked {

  @ViewChild('scrollArea') private scrollArea!: ElementRef;

  constructor(private socketcon: Socketserv, private chatServ: Chat, private cdr: ChangeDetectorRef) { }

  messages: any[] = [];
  messageText = '';
  users: any[] = [];

  currentUserId: string = '';
  receiverId: string = '';
  selectedUser: any = null;

  shouldScroll = false;

  ngOnInit() {
    const raw = localStorage.getItem('user');

    if (raw) {
      this.currentUserId = raw;
    }

    console.log('currentUserId:', this.currentUserId);

    this.initSocket();
  }

  initSocket() {

    const client = this.socketcon.getClient();

    if (!client) {
      console.log("Waiting for socket...");
      setTimeout(() => this.initSocket(), 500);
      return;
    }

    console.log("Socket ready");

    this.loadUsers();

    this.chatServ.startListening();

    this.chatServ.messages$.subscribe((msgs: any[]) => {

      if (!msgs) return;

      this.messages = [...msgs];
      this.shouldScroll = true;

    });

  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  scrollToBottom() {
    try {
      const el = this.scrollArea?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    } catch (e) { }
  }

  trackByMsg(index: number, item: any) {
    return item._id || index;
  }

  loadUsers() {
    console.log("hiii")

    const client = this.socketcon.getClient();

    if (!client) return;

    client.service('userdet').find()
      .then((res: any) => {

        const data = res?.data || res || [];

        this.users = data.filter((u: any) => u._id !== this.currentUserId);
        this.cdr.detectChanges();

      })
      .catch((err: any) => {
        console.error('Failed to load users:', err);
      });

  }

  loadConversation() {

    if (!this.receiverId) return;

    const client = this.socketcon.getClient();

    console.log("Query:", this.currentUserId, this.receiverId);

    client.service('messages').find({
      query: {
        $or: [
          { senderId: this.currentUserId, receiverId: this.receiverId },
          { senderId: this.receiverId, receiverId: this.currentUserId }
        ],
        $sort: { createdAt: 1 }
      }
    })
      .then((res: any) => {
        this.messages = res.data || res;
        this.shouldScroll = true;
        this.cdr.detectChanges();

      })
      .catch((err: any) => {
        console.error('Find error:', err);
      });
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.receiverId = user._id;

    localStorage.setItem('selectedUser', JSON.stringify(user));

    this.messages = [];   // reset UI
    this.loadConversation();
  }

  sendMessage() {

    const text = this.messageText.trim();

    if (!text || !this.receiverId) return;

    const checkSend = this.chatServ.sendMessage({
      senderId: this.currentUserId,
      receiverId: this.receiverId,
      text
    });

    if (checkSend) {
      // this.loadConversation()

      this.messageText = '';
      this.shouldScroll = true;
    }

  }

}