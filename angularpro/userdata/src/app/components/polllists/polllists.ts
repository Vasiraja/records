import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Userserv } from '../../services/userserv';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Socketserv } from '../../services/socket/socketserv';
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
  usertype: string = '';
  currentUserId: string = '';
  activeTab = "view";
  loaded = false;
  voteCounts: Record<string, number> = {};
  voteOptions: Record<string, any[]> = {};
  timers: { [pollId: string]: string } = {};
  private timerInterval: any;

  constructor(
    private userServ: Userserv,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private socketCon: Socketserv,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.activeTab = params['tab'] || 'view';
    });

    setTimeout(async () => {
      this.usertype = (localStorage.getItem('userType') || 'guest').toLowerCase().trim();
      this.currentUserId = localStorage.getItem('user') || '';
      this.loaded = true;
      this.cdr.detectChanges();
      await this.socketCon.connect();
      this.initialPolls();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.socketCon.voteService().off('created');
  }

  async initialPolls() {
    this.usertype = (localStorage.getItem('userType') || 'guest').toLowerCase().trim();
    this.userServ.getPolls().subscribe({
      next: async (data: any) => {
        this.polls = data?.data || data;
        this.startTimers();
        await this.loadAllVoteCounts();
        this.listenForLiveVotes();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("API Error:", err);
      }
    });
  }

  async loadAllVoteCounts() {
    for (const poll of this.polls) {
      const result: any = await this.socketCon.voteService().find({
        query: { pollId: poll._id }
      });

      this.voteCounts[poll._id] = result.data.length;

      const optionCounts: Record<string, number> = {};
      poll.options.forEach((o: any) => (optionCounts[o.id] = 0));
      result.data.forEach((vote: any) => {
        if (optionCounts[vote.optionId] !== undefined)
          optionCounts[vote.optionId]++;
      });
      this.voteOptions[poll._id] = poll.options.map((o: any) => ({
        ...o,
        votes: optionCounts[o.id] || 0
      }));
    }
    this.cdr.detectChanges();
  }

  listenForLiveVotes() {
    this.socketCon.voteService().off('created');
    this.socketCon.voteService().on('created', (vote: any) => {
      this.zone.run(() => {
        if (this.voteCounts[vote.pollId] !== undefined) {
          this.voteCounts[vote.pollId]++;
          const opts = this.voteOptions[vote.pollId];
          if (opts) {
            const opt = opts.find((o: any) => String(o.id) === String(vote.optionId));
            if (opt) opt.votes++;
          }
        }
        this.cdr.detectChanges();
      });
    });
  }

  getPercent(pollId: string, optionVotes: number): number {
    const total = this.voteCounts[pollId] || 0;
    if (!total) return 0;
    return Math.round((optionVotes / total) * 100);
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
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
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
    if (this.usertype === 'guest') {
      this.toast.showToast("Restricted", "You don't have access.");
      return;
    }
    const polldetails = {
      id: crypto.randomUUID(),
      question: this.question,
      options: this.options
        .filter(o => o.trim() !== '')
        .map(text => ({ id: crypto.randomUUID(), text })),
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
    if (!this.currentUserId) return false;
    if (this.usertype === 'admin') return true;
    return poll.isActive && poll.createdBy === this.currentUserId;
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