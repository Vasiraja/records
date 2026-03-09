import { Component, OnInit } from '@angular/core';
import { Socketserv } from '../../services/socket/socketserv';
import { Chat } from '../../services/chat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  imports: [CommonModule,FormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {


  constructor(private socketcon: Socketserv,private chatServ:Chat) { }


  messages: any[] = [];
  messageText="";

  currentUserId="69a564e8e9dd7194b6da349f"
  receiverId="69ae8c8028cc64e731f33646"
  
  ngOnInit() {

    const client = this.socketcon.getClient()

    console.log("Client object:", client)

    if (!client) {
      console.log("Socket client not ready")
      return
    }

    console.log("Listening for messages...")

    client.service('messages').on('created', (msg: any) => {
      console.log("Realtime message received:", msg)
    })

  }


  sendMessage(){
   if(!this.messageText.trim) return 

   this.chatServ.sendMessage({
    senderId:this.currentUserId,
    receiverId:this.receiverId,
    text:this.messageText
   })

   this.messageText="";
  }
}
