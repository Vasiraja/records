import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Userserv } from '../../services/userserv';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { ApiResponse, LoginLog, User } from '../../models/types';
import { jwtDecode } from 'jwt-decode';
import { Messages } from '../messages/messages';
Chart.register(...registerables);

@Component({
  selector: 'app-roleanalysis',
  imports: [CommonModule],
  templateUrl: './roleanalysis.html',
  styleUrl: './roleanalysis.css',
})
export class Roleanalysis implements OnInit, AfterViewInit {

  @ViewChild('pieChart', { static: false }) pieChart!: ElementRef;

  recentLogins: {
    firstname?: string, loginTime: string, source: string, email: string;
  }[] = [];

  totalLogins = 0;
  browserLogins = 0;
  apiLogins = 0;
  userTypeView: any = "";
  lastLoginTime = '';
  pageSize = 10;
  currentPage = 1;
  Math = Math;
  userCounts = { admin: 0, user: 0, guest: 0 }
  constructor(private userDet: Userserv, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userDet.loginWatch$.subscribe(() => {
      this.buildRecentLogins(); 
    })
    this.getCurrentAdminType()
    setTimeout(() => this.buildPieChart(), 0);
 
  }

  ngAfterViewInit(): void {
    this.buildPieChart();
  }
  getUserCount(role: string): number {
    return this.recentLogins.filter(
      (u: any) => u.userType?.toLowerCase() === role
    ).length
  }
  getCurrentAdminType() {
    const token = localStorage.getItem('token');
    if (!token) return;



    const decoded: any = jwtDecode(token);
    const userId = decoded.sub;

    this.userDet.getType(userId).subscribe({
      next: (res: any) => {
        const role = res.userType?.trim().toLowerCase();
        localStorage.setItem('userType', role);
        this.userTypeView = localStorage.getItem('userType');
        console.log(this.userTypeView)
        this.cdr.detectChanges()
      },
      error: () => {
        localStorage.setItem('userType', 'guest');
        this.cdr.detectChanges();

      }
    });
  }
  get totalPages(): number {
    return Math.ceil(this.recentLogins.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedLogins() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.recentLogins.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  buildPieChart(): void {
  this.userDet.getData().subscribe((res: any) => {
    let count = { admin: 0, user: 0, guest: 0 }

    res.data.forEach((item: any) => {
      const role = (item.userType || '').toLowerCase()
      if (role === 'admin') count.admin++
      else if (role === 'user') count.user++
      else if (role === 'guest') count.guest++
    })

    this.userCounts = count

    if (!this.pieChart?.nativeElement) return

    new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Admin', 'User', 'Guest'],
        datasets: [{
          label: 'Roles',
          data: [count.admin, count.user, count.guest],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    })
  })
}
  buildRecentLogins(): void {
    this.userDet.getLogs().subscribe((logsRes: any) => {
      this.userDet.getData().subscribe((usersRes: any) => {

         const logsData: any[] = Array.isArray(logsRes) ? logsRes : logsRes.data;
        const usersData: any[] = Array.isArray(usersRes) ? usersRes : usersRes.data;

        const userMap: { [id: string]: { name: string, email: string } } = {};
        usersData.forEach((user: any) => {
          userMap[user._id] = {
            name: user.firstname || user._id,
            email: user.email || 'N/A'
          };
        });

        const validLogs = logsData
          .filter((item: any) => item.loginAt && !isNaN(new Date(item.loginAt).getTime()));

        const sortedLogs = logsData
          .filter((item: any) => item.loginAt && !isNaN(new Date(item.loginAt).getTime()))
          .sort((a: any, b: any) => new Date(b.loginAt).getTime() - new Date(a.loginAt).getTime());
        this.recentLogins = sortedLogs.map((item: any) => ({
          firstname: userMap[item.userId]?.name || item.userId,
          email: userMap[item.userId]?.email || 'N/A',
          loginTime: new Date(item.loginAt).toLocaleString('en-IN', {
            day: '2-digit', month: 'short',
            hour: '2-digit', minute: '2-digit',
            hour12: true, timeZone: 'Asia/Kolkata'
          }),
          source: (item.userAgent || '').toLowerCase().includes('mozilla') ? 'Browser' : 'API'
        }));

        this.currentPage = 1;
        this.cdr.detectChanges();
      });
    }, (error: any) => console.error(error));
  }
}