import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Userserv } from '../../services/userserv';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-roleanalysis',
  imports: [],
  templateUrl: './roleanalysis.html',
  styleUrl: './roleanalysis.css',
})
export class Roleanalysis implements OnInit, AfterViewInit {


  @ViewChild('pieChart') pieChart!: ElementRef;


  constructor(private userDet: Userserv) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
      this.userDet.getData().subscribe((res: any) => {
        let count = { admin: 0, user: 0, guest: 0 };
        res.data.forEach((item: any) => {
          const typeaccess = (item.userType || '').toLowerCase();
          if (typeaccess === 'admin') count.admin++;
          else if (typeaccess === 'user') count.user++;
          else if (typeaccess === 'guest') count.guest++;
        });

        new Chart(this.pieChart.nativeElement, {
          type: 'pie',
          data: {
            labels: ['Admin', 'User', 'Guest'],
            datasets: [
              {
                label: 'Roles',
                data: [count.admin, count.user, count.guest],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
              }
            ]
          }
        });
      })
    }


        loadServiceUser() {

          this.userDet.getData().subscribe({
            next: (res: any) => {

              let count = { admin: 0, user: 0, guest: 0 };
              res.data.map((items: any) => {
                if ((items.userType).toLowerCase() === "user") {
                  count.user++;
                }
                else if ((items.userType).toLowerCase() === "admin") {
                  count.admin++;
                }
                else if ((items.userType).toLowerCase() === "guest") {
                  count.guest++;
                }





              })
              // this.pieChartData = [count.admin, count.guest, count.user];
            },
            error: (err: any) => {
              console.error(err);
            }
          })

        }


      }
