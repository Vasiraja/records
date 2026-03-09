import { Injectable } from '@angular/core';
import { Socketserv } from './socket/socketserv';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Chat {

  

  private messagesSubject = new BehaviorSubject<any[]>([])
  messages$ = this.messagesSubject.asObservable()

  constructor(private socketServ: Socketserv) { }

  startListening() {

    const client = this.socketServ.getClient()

    if (!client) return

    client.service('messages').on('created', (msg: any) => {

      console.log("Realtime message:", msg)

      const current = this.messagesSubject.value
      this.messagesSubject.next([...current, msg])

    })

  }

  sendMessage(data: any) {

    const client = this.socketServ.getClient()

    return client.service('messages').create(data)

  }

}
