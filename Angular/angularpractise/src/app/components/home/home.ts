import { Component , DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Homechild } from '../homechild/homechild';
import { Encapsulation } from '../encapsulation/encapsulation';
import { Contentprojection } from '../contentprojection/contentprojection';
@Component({
  selector: 'app-home',
  imports: [CommonModule,Homechild,Encapsulation,Contentprojection  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit , DoCheck {
  showContent = true;
  triggeredChild:boolean=true;
  removechild(){
    this.triggeredChild=!this.triggeredChild;
  }
  ngDoCheck(): void {

    console.log("change detection occured")

 
  }

  randomUsers:any[]=[];
  childPass :any|undefined;
  timer:any=0;

  ngOnInit(): void {
    this.ngdochecktrigger();
    fetch("https://randomuser.me/api/").then(res=>res.json()
  .then(data=>{
    console.log(data.results)
    this.randomUsers=data.results;
    console.log(this.randomUsers)
  })
  .catch(err=>console.error(err))
)
  }
  triggerNgOnChanges(){
    this.childPass= "passed Value"
  }
  ngdochecktrigger(){
    setInterval(() => {
        this.timer= Math.floor(Math.random() * 1000);
        
    }, 2000);
  }






}
