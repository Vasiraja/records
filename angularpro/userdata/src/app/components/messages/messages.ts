import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild, NgZone } from '@angular/core';
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
export class Messages implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scrollArea') private scrollArea!: ElementRef;

  messages: any[] = [];
  messageText = '';
  searchText = '';
  users: any[] = [];
  currentUserId = '';
  receiverId = '';
  selectedUser: any = null;
  shouldScroll = false;

  constructor(
    private socketcon: Socketserv,
    private chatServ: Chat,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit() {
    const raw = localStorage.getItem('user');
    if (raw) this.currentUserId = raw;
    this.initSocket();
  }

  ngOnDestroy() {
    const client = this.socketcon.getClient();
    if (client) {
      client.service('messages').off('created');
    }
  }

  initSocket() {
    const client = this.socketcon.getClient();
    if (!client) {
      setTimeout(() => this.initSocket(), 500);
      return;
    }

    this.loadUsers();

    client.service('messages').off('created');

    client.service('messages').on('created', (msg: any) => {

      this.zone.run(() => {

        const senderIsOther = String(msg.senderId) === String(this.receiverId);
        const receiverIsMe = String(msg.receiverId) === String(this.currentUserId);

        if (!senderIsOther || !receiverIsMe) return;

        const alreadyExists = this.messages.some(m => String(m._id) === String(msg._id));
        if (alreadyExists) return;

        this.messages = [...this.messages, msg];
        this.shouldScroll = true;
        this.cdr.detectChanges();

      });

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
      if (el) el.scrollTop = el.scrollHeight;
    } catch (e) { }
  }

  filteredUsers() {
    if (!this.searchText.trim()) return this.users;
    return this.users.filter(u =>
      u.firstname?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  loadUsers() {
    const client = this.socketcon.getClient();
    if (!client) return;
    client.service('users').find()
      .then((res: any) => {
        const data = res?.data || res || [];
        this.users = data.filter((u: any) => u._id !== this.currentUserId);
        this.cdr.detectChanges();
      })
      .catch((err: any) => console.error(err));
  }

  loadConversation() {
    if (!this.receiverId) return;
    const client = this.socketcon.getClient();
    client.service('messages').find({
      query: {
        $limit: 500,
        $or: [
          { senderId: this.currentUserId, receiverId: this.receiverId },
          { senderId: this.receiverId, receiverId: this.currentUserId }
        ],
        $sort: { createdAt: 1 }
      }
    })
      .then((res: any) => {
        this.messages = res.data || res;
        this.cdr.detectChanges();
        setTimeout(() => this.scrollToBottom(), 0);
      })
      .catch((err: any) => console.error(err));
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.receiverId = user._id;
    this.messages = [];
    this.loadConversation();
  }

  sendMessage() {
    const text = this.messageText.trim();
    if (!text || !this.receiverId) return;

    const tempId = crypto.randomUUID();

    const tempMsg = {
      _id: tempId,
      _isTemp: true,
      senderId: this.currentUserId,
      receiverId: this.receiverId,
      text,
      createdAt: new Date().toISOString()
    };

    this.messages = [...this.messages, tempMsg];
    this.shouldScroll = true;
    this.messageText = '';
    this.cdr.detectChanges();

    this.chatServ.sendMessage({
      senderId: this.currentUserId,
      receiverId: this.receiverId,
      text
    }).then((saved: any) => {
      this.messages = this.messages
        .filter(m => m._id !== tempId)
        .concat(saved);
      this.shouldScroll = true;
      this.cdr.detectChanges();
    }).catch(() => {
      this.messages = this.messages.filter(m => m._id !== tempId);
      this.cdr.detectChanges();
    });
  }

  trackById(index: number, item: any) { return item._id || index; }
  trackByMsg(index: number, item: any) { return item._id || index; }
}