import { Component } from '@angular/core';
import { Homechild } from '../homechild/homechild';

import { OnInit,OnChanges,DoCheck } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [Homechild],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit,DoCheck {

  sendingValue:string|undefined;
  randomInput:number|undefined;

  constructor(){  }
  ngDoCheck(): void {
     console.log("Do check Triggered")
  } 
  ngOnInit(): void {
    this.sendingValue="creatementioning";
    this.sendingValue=this.randomInput as unknown as string;


    // setInterval(()=>{
    // this.randomInput=Math.floor(Math.random()*1000);
    // this.sendingValue=this.randomInput.toString();
    // // console.log(this.sendingValue);
    // },1000)

  }
  changeInputs(){
    this.sendingValue="triggeredinput"
  }
 
}
