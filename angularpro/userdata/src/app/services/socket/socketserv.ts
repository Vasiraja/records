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

    if (this.socket) {
      return
    }

    // const token = localStorage.getItem('feathers-jwt')
    // if (!token) return

    this.socket = io('http://localhost:3030', {
      transports: ['websocket'], withCredentials: false
    })

    this.client = feathers()

    this.client.configure(socketio(this.socket))



    return new Promise<void>((resolve) => {

      this.socket!.once('connect', () => {

        console.log("Socket connected")

        resolve()

      })

    })
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
    if (!this.socket) {
      console.log("Socket not ready")
      return
    }

    console.log("Emitting joinPoll:", senderId,receiverId)

    this.socket.emit('joinMsg', senderId,receiverId);

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


}