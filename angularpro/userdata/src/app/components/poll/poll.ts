import { Component, OnDestroy, OnInit, NgZone, ChangeDetectorRef, Input } from '@angular/core';
import { Socketserv } from '../../services/socket/socketserv';
import { CommonModule } from '@angular/common';
import { Polllists } from '../polllists/polllists';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poll.html',
  styleUrls: ['./poll.css']
})
export class Poll implements OnInit, OnDestroy {

  poll: any = null
  hasVoted = false
  totalVotes = 0
  private userId: string | null = null

  constructor(
    private socketCon: Socketserv,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }
  @Input() pollId!: string

  async ngOnInit() {
    await this.socketCon.connect()

    this.userId = localStorage.getItem('user')

    let setPollIds = localStorage.getItem("pollid");

    const poll = await this.socketCon.pollService().get(setPollIds)
    this.poll = poll

    this.socketCon.joinPoll(this.poll._id)

    const votes: any = await this.socketCon.voteService().find({
      query: { pollId: this.poll._id }
    })

    this.poll.options.forEach((opt: any) => opt.votes = 0)

    votes.data.forEach((vote: any) => {
      const option = this.poll.options.find(
        (o: any) => String(o.id) === String(vote.optionId)
      )
      if (option) option.votes++

      if (String(vote.userId) === String(this.userId)) {
        this.hasVoted = true
      }
    })

    this.totalVotes = votes.data.length;
    this.cdr.detectChanges()

    this.socketCon.voteService().on('created', (vote: any) => {
      this.zone.run(() => {
        this.totalVotes++

        if (String(vote.userId) === String(this.userId)) return

        const option = this.poll.options.find((o: any) => o.id === vote.optionId)
        if (option) option.votes = (option.votes || 0) + 1

        this.cdr.detectChanges()
      })
    })    
  }

  async vote(optionId: string) {
    if (this.hasVoted) return
    if (!this.userId) return

    this.hasVoted = true
    this.totalVotes++
    const option = this.poll.options.find((o: any) => o.id === optionId)
    if (option) option.votes = (option.votes || 0) + 1
    this.cdr.detectChanges()

    try {
      await this.socketCon.voteService().create({
        pollId: this.poll._id,
        optionId,
        userId: this.userId
      })
    } catch (err) {
      this.hasVoted = false
      this.totalVotes--
      if (option) option.votes = (option.votes || 0) - 1
      this.cdr.detectChanges()
      console.error('Vote failed:', err)
    }
  }

  getPercent(votes: number): number {
    if (!this.totalVotes) return 0
    return Math.round((votes / this.totalVotes) * 100)
  }

  ngOnDestroy() {
    if (this.poll) {
      this.socketCon.leavePoll(this.poll._id)
    }
  }

}