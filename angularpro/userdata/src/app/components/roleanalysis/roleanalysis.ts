import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Userserv } from '../../services/userserv';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { ApiResponse, LoginLog, User } from '../../models/types';
Chart.register(...registerables);

@Component({
  selector: 'app-roleanalysis',
  imports: [CommonModule],
  templateUrl: './roleanalysis.html',
  styleUrl: './roleanalysis.css',
})
export class Roleanalysis implements OnInit, AfterViewInit {

  @ViewChild('pieCharts') pieChart!: ElementRef; 
  

  recentLogins: {
    firstname: string, loginTime: string, source: string, email: string;
  }[] = [];

  totalLogins = 0;
  browserLogins = 0;
  apiLogins = 0;
  lastLoginTime = '';

  constructor(private userDet: Userserv, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userDet.loginWatch$.subscribe(()=>{
      this.buildRecentLogins();
    })
  }

  ngAfterViewInit(): void {
    this.buildPieChart();
  }

  buildPieChart(): void {
    this.userDet.getData().subscribe((res: any) => {
      let count = { admin: 0, user: 0, guest: 0 };

      res.data.forEach((item: any) => {
        const role = (item.userType || '').toLowerCase();
        if (role === 'admin') count.admin++;
        else if (role === 'user') count.user++;
        else if (role === 'guest') count.guest++;
      });

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
      });
    });
  }
buildRecentLogins(): void {
  this.userDet.getLogs().subscribe((logsRes: ApiResponse<LoginLog[]>) => {

    this.userDet.getData().subscribe((usersRes: ApiResponse<User[]>) => {

      const userMap: { [id: string]: { name: string, email: string } } = {};
      usersRes.data.forEach((user: any) => {
        userMap[user._id] = {
          name: user.firstname || user._id,
          email: user.email || 'N/A'
        };
      });

      const validLogs = logsRes.data
        .filter((item: any) => item.loginAt && !isNaN(new Date(item.loginAt).getTime()));

      const sortedLogs = validLogs
        .sort((a: any, b: any) => new Date(b.loginAt).getTime() - new Date(a.loginAt).getTime());

      const top10Logs = sortedLogs.slice(0, 10);

      this.recentLogins = top10Logs.map((item: any) => ({
        firstname: userMap[item.userId]?.name || item.userId,  // ✅
        email:     userMap[item.userId]?.email || 'N/A',       // ✅
        loginTime: new Date(item.loginAt).toLocaleString('en-IN', {
          day: '2-digit', month: 'short',
          hour: '2-digit', minute: '2-digit',
          hour12: true, timeZone: 'Asia/Kolkata'
        }),
        source: (item.userAgent || '').toLowerCase().includes('mozilla') ? 'Browser' : 'API'
      }));

      this.cdr.detectChanges();
    });

  }, (error: any) => console.error(error));
}
}