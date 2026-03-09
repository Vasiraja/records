import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';

@Injectable({
  providedIn: 'root'
})
export class Socketserv {

  private socket: Socket | null = null
  private client: any

  constructor() { }
   connect() {

  const token = localStorage.getItem('token')
  if (!token) {
    console.warn('No token found. Socket not connected')
    return
  }

  if (this.socket && this.socket.connected) {
    return
  }

  this.socket = io('http://localhost:3030', {
    transports: ['websocket']
  })

  this.client = feathers()

  this.client.configure(socketio(this.socket))
  this.client.configure(authentication({
    storage: window.localStorage
  }))

  this.socket.on('connect', () => {
    console.log('Socket connected')
  })

  this.socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })

  this.socket.on('connect_error', (err: any) => {
    console.error('Socket connection error:', err)
  })

}

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      console.log('Socket manually disconnected')
    }
  }


  getClient() {
    return this.client
  }
}