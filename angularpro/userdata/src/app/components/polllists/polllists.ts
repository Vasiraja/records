import { Component, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Userserv } from '../../services/userserv';
import { Router } from '@angular/router';
@Component({
  selector: 'app-polllists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './polllists.html',
  styleUrl: './polllists.css',
})
export class Polllists implements OnInit {

  @Output() pollSelected = new EventEmitter<string>()

  polls: any[] = []
 
  constructor(private userServ: Userserv, private router: Router,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initialPolls(); 

   }

  initialPolls() {
    this.userServ.getPolls().subscribe({
      next: (data: any) => {
        console.log(data)
        this.polls = data?.data || data;
        this.cdr.detectChanges();
       },
      error: (err) => {
        console.error("API Error:", err)
       }
    })
  }

  openPoll(pollId: string) {
    this.pollSelected.emit(pollId)
    localStorage.setItem("pollid", pollId)
    this.router.navigate(['/poll'])
  }
}