import { Component, OnInit, signal } from '@angular/core';
import { ansValues } from "../../data/answer";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-trial',
  imports: [CommonModule],
  templateUrl: './trial.html',
  styleUrl: './trial.css',
})
export class Trial implements OnInit {


  userVals = signal<any[]>([]);
  pageSize = 10;
  userLengths: number = 0;

  currentpage: number = 1;






  ngOnInit(): void {


    this.userVals.set(ansValues);


    if (this.userVals) {
      console.log(this.userVals())
      this.userLengths = this.userVals().length;



    }
  }

  get totalPageCalc() {

    const result = Math.ceil(this.userLengths / this.pageSize)

    return result;
  }

  get PageArray() {
    const pageNumberButtons: number[] = [];
    for (let i = 1; i <= this.totalPageCalc; i++) {
      pageNumberButtons.push(i);
    }

    return pageNumberButtons;
  }

  get PaginatedLogins() {
    const start = (this.currentpage - 1) * this.pageSize;
    const end = start + this.pageSize;

    return this.userVals().slice(start, end);
  }

  goToPage(page: number) {

    if (page < 1 || page > this.totalPageCalc) return

    this.currentpage = page;


  }

  goToPrevious() {

    if (this.currentpage > 1) {
      this.currentpage--;
    }


  }
  goToNext() {
    if (this.currentpage < this.totalPageCalc) {
      this.currentpage++
    }

  }



}
