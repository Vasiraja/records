import { Component, OnDestroy, OnInit, NgZone, ChangeDetectorRef, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Socketserv } from '../../services/socket/socketserv';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Userserv } from '../../services/userserv';


@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.html',
  styleUrls: ['./poll.css']
})
export class Poll implements OnInit, OnDestroy, AfterViewChecked {

  poll: any = null
  hasVoted = false
  totalVotes = 0
  liveMessage: string = "";
  messages: any[] = []
  private userId: string | null = null
  @ViewChild('chatScroll') private chatScroll!: ElementRef;

  constructor(
    private socketCon: Socketserv,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private userServ: Userserv
  ) { }
  ngAfterViewChecked(): void {
    this.scrollToBottom();

  }
  @Input() pollId!: string
  async ngOnInit() {

    await this.socketCon.connect()

    this.userId = localStorage.getItem('user')

    const setPollIds = localStorage.getItem("pollid")

    if (!setPollIds) return

    const poll = await this.socketCon.pollService().get(setPollIds)
    this.poll = poll

    this.socketCon.joinPoll(this.poll._id)

    const oldMessages: any = await this.socketCon.liveMessageService().find({
      query: {
        pollId: String(this.poll._id),
        $sort: { createdAt: 1 }
      }
    })

    this.messages = [];

    for (const msg of oldMessages.data) {
      const userName = await this.getUserName(msg.userId);

      this.messages.push({
        ...msg,
        userName
      });
    }
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

    this.totalVotes = votes.data.length

    this.cdr.detectChanges()

    this.socketCon.voteService().off('created')

    this.socketCon.voteService().on('created', (vote: any) => {

      this.zone.run(() => {

        this.totalVotes++

        if (String(vote.userId) === String(this.userId)) return

        const option = this.poll.options.find((o: any) => o.id === vote.optionId)

        if (option) option.votes = (option.votes || 0) + 1

        this.cdr.detectChanges()

      })

    })

    this.socketCon.liveMessageService().off('created')

    this.socketCon.liveMessageService().on('created', async (msg: any) => {


      if (String(msg.pollId) !== String(this.poll._id)) return

      msg.userName = await this.getUserName(msg.userId)

      this.zone.run(() => {

        this.messages.push(msg)

        this.cdr.detectChanges()

      })

    })




  }


  scrollToBottom(): void {

    try {
      this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight;
    }
    catch (err) { }
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
  async getUserName(userId: string): Promise<string> {
    return new Promise((resolve) => {
      this.userServ.getNames(userId).subscribe({
        next: (data: any) => {
          resolve(data?.firstname || 'User');
        },
        error: (err: any) => {
          console.error(err);
          resolve('User');
        }
      });
    });
  }

  getPercent(votes: number): number {
    if (!this.totalVotes) return 0
    return Math.round((votes / this.totalVotes) * 100)
  }

  async sendLiveMessage() {

    try {

      const pollIdSend = localStorage.getItem("pollid")

      if (pollIdSend && this.liveMessage.trim()) {

        await this.socketCon.liveMessageService().create({
          pollId: pollIdSend,
          userId: this.userId,
          message: this.liveMessage
        })

        this.liveMessage = ""

        setTimeout(() => {
          this.scrollToBottom()
        }, 0);

      }

    } catch (err) {
      console.error("Error when sending messages:", err)
    }

  }

  ngOnDestroy() {
    if (this.poll) {
      this.socketCon.leavePoll(this.poll._id)
    }
  }
  // scrollChat() {
  //   setTimeout(() => {
  //     const el = this.chatScroll?.nativeElement;
  //     if (el) el.scrollTop = el.scrollHeight;
  //   }, 50);
  // }
}