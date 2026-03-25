import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
// import authentication from '@feathersjs/authentication-client';

@Injectable({
  providedIn: 'root'
})
export class Socketserv {

  public socket: Socket | null = null
  private client: any

  constructor() { }

  async connect() {
    if (this.socket) return;

    this.socket = io('http://localhost:3030', {
      transports: ['websocket']
    });

    this.client = feathers();
    this.client.configure(socketio(this.socket));

    return new Promise<void>((resolve, reject) => {
      this.socket!.on('connect', () => {
        console.log(" Socket connected:", this.socket!.id);
        resolve();
      });

      this.socket!.on('connect_error', reject);
    });
  }


  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket.off()
      this.socket = null
    }
  }

  getClient() {
    return this.client
  }


  joinPoll(pollId: string) {

    if (!this.socket) {
      console.log("Socket not ready")
      return
    }

    console.log("Emitting joinPoll:", pollId)

    this.socket.emit('joinPoll', pollId)

  }

  joinMsg(senderId: string, receiverId: string) {
    if (!this.socket?.connected) {
      console.log("Socket not ready");
      return;
    }

    this.socket.emit('joinMsgRoom', {
      senderId,
      receiverId
    });


  }

  messageService() {
    return this.client.service('chatserv');
  }
  leavePoll(pollId: string) {
    if (!this.socket) return
    this.socket.emit('leavePoll', pollId)
  }

  pollService() {
    return this.client.service('polls')
  }

  voteService() {
    return this.client.service('votes')
  }

  liveMessageService() {
    return this.client.service('poll-messages')
  }
  userService() {
    return this.client.service('users')
  }





}