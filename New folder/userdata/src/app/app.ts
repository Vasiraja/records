import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Userserv } from './services/userserv';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Angular 18 uses standalone by default
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
   users = signal<any[]>([]);
   editField:boolean=false;
  // users:any[]=[];
  
 constructor(private userdetService:Userserv){}
  ngOnInit(): void {
    this.fetching();
  }

  editUser(){
    this.editField=true;

  }
  updateUser(){
    this.editField=false;
  }


  fetching() {
    this.userdetService.getData().subscribe({
      next: (res: any) => {
        if (res && res.data) {
           this.users.set(res.data);
        }
      },
      error: (err) => console.error('Fetch error:', err)
    });
  }
}
