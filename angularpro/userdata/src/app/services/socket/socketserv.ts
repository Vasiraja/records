import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client'; // ✅ Add this

@Injectable({
  providedIn: 'root'
})
export class Socketserv {
  private socket: Socket;
  private feathersApp: any;

  constructor() {
    this.socket = io('http://localhost:3030', {
      autoConnect: false
    });

    this.feathersApp = feathers()
      .configure(socketio(this.socket))
      .configure(authentication()); 
  }

  async connect() {
    this.socket.connect();

     const token = localStorage.getItem('token');
    if (token) {
      await this.feathersApp.authenticate({
        strategy: 'jwt',
        accessToken: token
      });
      console.log('Socket authenticated!')
    }
  }

  service(name: string) {
    return this.feathersApp.service(name);
  }

  listen<T>(event: string): Observable<T> {
    return new Observable(observer => {
      this.socket.on(event, (data: T) => observer.next(data));
    });
  }

  disconnect() {
    this.feathersApp.logout();  
    this.socket.disconnect();
  }
}  