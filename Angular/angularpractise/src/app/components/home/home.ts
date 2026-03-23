import { Component, DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Homechild } from '../homechild/homechild';
import { Encapsulation } from '../encapsulation/encapsulation';
import { Contentprojection } from '../contentprojection/contentprojection';
import { Inputoutputdec } from '../inputoutputdec/inputoutputdec';
import { Angulareighteen } from '../angulareighteen/angulareighteen';
import { Heavycomponent } from '../heavycomponent/heavycomponent';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Homechild, Encapsulation, Contentprojection, Inputoutputdec, Angulareighteen , Heavycomponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, DoCheck {
  showContent = true;
  triggeredChild: boolean = true;
  parentVar: string = "parentValue Here";
  countPar: number = 0;
  passValue = "Parent User";
  receivedMessage: string | undefined;
  parentSideModel: string = ""




  removechild() {
    this.triggeredChild = !this.triggeredChild;
  }
  ngDoCheck(): void {

    console.log("change detection occured")


  }

  randomUsers: any[] = [];
  childPass: any | undefined;
  timer: any = 0;

  ngOnInit(): void {
    this.ngdochecktrigger();
    fetch("https://randomuser.me/api/").then(res => res.json()
      .then(data => {
        console.log(data.results)
        this.randomUsers = data.results;
        console.log(this.randomUsers)
      })
      .catch(err => console.error(err))
    )
  }
  triggerNgOnChanges() {
    this.childPass = "passed Value"
  }
  ngdochecktrigger() {
    setInterval(() => {
      this.timer = Math.floor(Math.random() * 1000);

    }, 2000);
  }
  increaseParentCount() {
    this.countPar++;
  }

  noOfStocks(value: number) {
    console.log(value + ": Available stocks in child component")
  }
  triggerParent(msg: string) {
    this.receivedMessage = msg;
  }

  priceGot(value: any) {
    console.log("Final Price: " + value)
  }



}
