import { Component, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Userserv } from '../../services/userserv';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Toast } from '../../shared/toast/toast';

@Component({
  selector: 'app-polllists',
  standalone: true,
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './polllists.html',
  styleUrl: './polllists.css',
})
export class Polllists implements OnInit {

  @Output() pollSelected = new EventEmitter<string>()
  @ViewChild(Toast) toast!: Toast;

  options: string[] = ['', ''];
  question: string = "";

  polls: any[] = []
  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  usertype: string = localStorage.getItem('userType') || 'guest';
  currentUserId: string = localStorage.getItem('user') || '';

  activeTab = "view";
  constructor(private userServ: Userserv, private router: Router, private cdr: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initialPolls();

    this.route.queryParams.subscribe(params => {
      this.activeTab = params['tab'] || 'view';
    })
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
  trackByIndex(index: number): number {
    return index;
  }

  openPoll(pollId: string) {
    this.pollSelected.emit(pollId)
    localStorage.setItem("pollid", pollId)
    this.router.navigate(['/poll'])
  }

  addOption() {
    this.options.push('');
  }

  removeOption(index: number) {
    this.options.splice(index, 1);
  }
  createPoll() {
    console.log('currentUserId:', this.currentUserId);
    console.log('usertype:', this.usertype);

    const polldetails = {
      id: crypto.randomUUID(),
      question: this.question,
      options: this.options
        .filter(o => o.trim() !== '')
        .map(text => ({ id: crypto.randomUUID(), text })),
      createdBy: this.currentUserId,
      hidden: false,
      isActive: true
    };

    console.log('payload:', polldetails);
    this.userServ.postPolls(polldetails).subscribe({
      next: (data: any) => {


        this.toast.showToast("Success", "Poll Published");

        this.initialPolls();
        this.question = "";
        this.options = ['', ''];
        this.cdr.detectChanges();

      },
      error: (err: any) => {
        console.error("Error while post polls: " + err)
      }

    })

  }

  canDelete(poll: any): boolean {
    if (this.usertype === 'admin') return true;
    return String(poll.createdBy) === String(this.currentUserId);
  }

  deletePoll(pollId: string) {
    if (this.usertype === 'admin') {
      this.userServ.deletePoll(pollId).subscribe(() => {
        this.polls = this.polls.filter(p => p.id !== pollId);
        this.cdr.detectChanges();
        this.toast.showToast("Success", "Poll Deleted");
        this.initialPolls();


      });
    } else {
      this.userServ.hidePoll(pollId).subscribe(() => {
        this.polls = this.polls.filter(p => p.id !== pollId);
        this.cdr.detectChanges();
        this.toast.showToast("Success", "Poll Deleted");
        this.initialPolls();

      });
    }
  }
} 