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

  async ngOnInit() {
    const raw = localStorage.getItem('user');
    if (raw) this.currentUserId = raw;

    await this.socketcon.connect();

    this.loadUsers();
    this.listenToMessages();
    this.shouldScroll = true;

    this.socketcon.userService().on('patched', (updatedUser: any) => {
      this.zone.run(() => {
        this.users = this.users.map((u: any) =>
          u._id === updatedUser._id ? updatedUser : u
        )
        this.cdr.detectChanges()
      })
    })



    const lastSelected = localStorage.getItem('selectedUser');

    if (lastSelected && raw) {
      this.receiverId = lastSelected;
      this.socketcon.joinMsg(this.currentUserId, this.receiverId);
      this.loadConversation();
    }
  }

  ngOnDestroy() {
    const client = this.socketcon.getClient();
    if (client) {
      client.service('chatserv').removeAllListeners('created');
    }
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
  listenToMessages() {
    const client = this.socketcon.getClient();
    if (!client) return;

    const service = client.service('chatserv');

    service.removeAllListeners('created');

    service.on('created', (msg: any) => {
      console.log("created...")
      console.log(msg.senderId);
      console.log(msg.receiverId);
      console.log(this.currentUserId)
      this.zone.run(() => {


        const isRelevant =
          (msg.senderId == this.currentUserId && msg.receiverId == this.receiverId) ||
          (msg.senderId == this.receiverId && msg.receiverId == this.currentUserId);

        if (!isRelevant) return;

        const exists = this.messages.some(m => m._id === msg._id);
        if (exists) return;

        this.messages = [...this.messages, msg];
        this.shouldScroll = true;

        this.cdr.detectChanges();
      });
    });
  }

  loadUsers() {
    const client = this.socketcon.getClient();
    if (!client) return;
    client.service('users').find({
      query: {
        $limit: 1001,
      }
    })
      .then((res: any) => {
        const data = res?.data || res || [];
        this.users = data.filter((u: any) => u._id !== this.currentUserId);
        this.cdr.detectChanges();
      })
      .catch((err: any) => console.error(err));
  }

  async loadConversation() {
    if (!this.receiverId) return;

    try {
      const result: any = await this.socketcon.messageService().find({
        query: {
          $limit: 500,
          $or: [
            {
              senderId: String(this.currentUserId),
              receiverId: String(this.receiverId)
            },
            {
              senderId: String(this.receiverId),
              receiverId: String(this.currentUserId)
            }
          ],
          $sort: { createdAt: 1 }
        }
      });

      this.messages = result?.data || result || [];

      this.shouldScroll = true;
      this.cdr.detectChanges();

      setTimeout(() => this.scrollToBottom(), 0);

    } catch (err) {
      console.error(" loadConversation error:", err);
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.receiverId = user._id;

    localStorage.setItem('selectedUser', user._id);

    this.messages = [];

    this.socketcon.joinMsg(this.currentUserId, this.receiverId);

    this.loadConversation();
  }

  async sendMessage() {
    const text = this.messageText.trim();
    if (!text || !this.receiverId) return;

    this.messageText = '';

    const client = this.socketcon.getClient();

    await client.service('chatserv').create({
      senderId: this.currentUserId,
      receiverId: this.receiverId,
      text
    }).catch((err: any) => console.error(err));
  }

  trackById(index: number, item: any) { return item._id || index; }
  trackByMsg(index: number, item: any) { return item._id || index; }
}