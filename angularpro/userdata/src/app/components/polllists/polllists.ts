import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
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
export class Polllists implements OnInit, OnDestroy {

  @Output() pollSelected = new EventEmitter<string>();
  @ViewChild(Toast) toast!: Toast;

  options: string[] = ['', ''];
  question: string = "";
  duration: number = 2;
  polls: any[] = [];
  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  usertype: string = localStorage.getItem('userType') || 'guest';
  currentUserId: string = localStorage.getItem('user') || '';
  activeTab = "view";

   timers: { [pollId: string]: string } = {};
  private timerInterval: any;

  constructor(
    private userServ: Userserv,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initialPolls();

    this.route.queryParams.subscribe(params => {
      this.activeTab = params['tab'] || 'view';
    });
  }

  ngOnDestroy(): void {
     if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  initialPolls() {
    this.userServ.getPolls().subscribe({
      next: (data: any) => {
        this.polls = data?.data || data;
        this.startTimers();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("API Error:", err);
      }
    });
  }

   startTimers() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.updateTimers();

    this.timerInterval = setInterval(() => {
      this.updateTimers();
      this.cdr.detectChanges();
    }, 1000);
  }

   updateTimers() {
    const now = new Date().getTime();

    for (const poll of this.polls) {
      if (!poll.isActive || !poll.expiresAt) {
        this.timers[poll._id] = '';
        continue;
      }

      const expires = new Date(poll.expiresAt).getTime();
      const remaining = expires - now;

      if (remaining <= 0) {
        this.timers[poll._id] = 'Expired';
        poll.isActive = false;
      } else {
        this.timers[poll._id] = this.formatRemaining(remaining);
      }
    }
  }

   formatRemaining(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  openPoll(pollId: string) {
    this.pollSelected.emit(pollId);
    localStorage.setItem("pollid", pollId);
    this.router.navigate(['/poll']);
  }

  addOption() {
    this.options.push('');
  }

  removeOption(index: number) {
    this.options.splice(index, 1);
  }

  createPoll() {
    const polldetails = {
      id: crypto.randomUUID(),
      question: this.question,
      options: this.options
        .filter(o => o.trim() !== '')
        .map(text => ({
          id: crypto.randomUUID(),
          text
        })),
      createdBy: this.currentUserId,
      hidden: false,
      duration: Number(this.duration) || 2
    };

    this.userServ.postPolls(polldetails).subscribe({
      next: () => {
        this.toast.showToast("Success", "Poll Published");
        this.question = "";
        this.options = ['', ''];
        this.duration = 2;
        this.initialPolls();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error("Error while posting poll:", err);
      }
    });
  }

  canDelete(poll: any): boolean {
    if (this.usertype === 'admin') return true;
    return String(poll.createdBy) === String(this.currentUserId);
  }

  deletePoll(pollId: string) {
    if (this.usertype === 'admin') {
      this.userServ.deletePoll(pollId).subscribe(() => {
        this.toast.showToast("Success", "Poll Deleted");
        this.initialPolls();
      });
    } else {
      this.userServ.hidePoll(pollId).subscribe(() => {
        this.toast.showToast("Success", "Poll Deleted");
        this.initialPolls();
      });
    }
  }
}