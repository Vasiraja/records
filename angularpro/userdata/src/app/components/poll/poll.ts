import { Component, OnDestroy, OnInit, NgZone, ChangeDetectorRef, Input, ViewChild, ElementRef } from '@angular/core';
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
export class Poll implements OnInit, OnDestroy {
  poll: any = null
  hasVoted = false
  totalVotes = 0
  liveMessage: string = ""
  messages: any[] = []
  isLoadingMore = false
  hasMoreMessages = true
  private currentSkip = 0
  private readonly PAGE_SIZE = 10
  private userId: string | null = null
  @ViewChild('chatScroll') private chatScroll!: ElementRef;
  usertype: string = localStorage.getItem('userType') || 'guest'
  votedOptionId: string | null = null

  constructor(
    private socketCon: Socketserv,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private userServ: Userserv
  ) { }

  @Input() pollId!: string
  async ngOnInit() {

    await this.socketCon.connect()

    this.userId = localStorage.getItem('user')

    const setPollIds = localStorage.getItem("pollid")

    if (!setPollIds) return

    const poll = await this.socketCon.pollService().get(setPollIds)
    this.poll = poll

    this.socketCon.joinPoll(this.poll._id)

    await this.loadLatestMessages()



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
        this.votedOptionId = vote.optionId
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
      const container = this.chatScroll.nativeElement
      container.scrollTop = container.scrollHeight + 100
    } catch (err) { }
  }
  async loadLatestMessages() {
    const result: any = await this.socketCon.liveMessageService().find({
      query: {
        pollId: String(this.poll._id),
        $sort: { createdAt: -1 },
        $limit: this.PAGE_SIZE,
        $skip: 0
      }
    })

    const batch = result.data.reverse()

    this.messages = []

    for (const msg of batch) {
      msg.userName = await this.getUserName(msg.userId)
      this.messages.push(msg)
    }

    this.currentSkip = this.PAGE_SIZE
    this.hasMoreMessages = result.total > this.PAGE_SIZE

    this.cdr.detectChanges()
    setTimeout(() => this.scrollToBottom(), 50)
  }
  async loadOlderMessages() {
    if (this.isLoadingMore || !this.hasMoreMessages) return

    this.isLoadingMore = true
    this.cdr.detectChanges()

    const result: any = await this.socketCon.liveMessageService().find({
      query: {
        pollId: String(this.poll._id),
        $sort: { createdAt: -1 },
        $limit: this.PAGE_SIZE,
        $skip: this.currentSkip
      }
    })

    const batch = result.data.reverse()

    const named: any[] = []
    for (const msg of batch) {
      msg.userName = await this.getUserName(msg.userId)
      named.push(msg)
    }

    const container = this.chatScroll.nativeElement
    const scrollHeightBefore = container.scrollHeight

    this.messages = [...named, ...this.messages]
    this.currentSkip += this.PAGE_SIZE
    this.hasMoreMessages = result.total > this.currentSkip

    this.isLoadingMore = false
    this.cdr.detectChanges()

    const scrollHeightAfter = container.scrollHeight
    container.scrollTop = scrollHeightAfter - scrollHeightBefore
  }
  onChatScroll() {
    const container = this.chatScroll.nativeElement
    if (container.scrollTop <= 20) {
      this.loadOlderMessages()
    }
  }
  async vote(optionId: string) {
    if (this.usertype === 'guest') return
    if (this.hasVoted) return
    if (!this.userId) return

    this.hasVoted = true
    this.votedOptionId = optionId
    this.totalVotes++
    const option = this.poll.options.find((item: any) => item.id === optionId)
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
      this.votedOptionId = null
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
  showGuestNudge() {

    alert('You dont have access yet')
  }
  async sendLiveMessage() {

    if (this.usertype === 'guest') return
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