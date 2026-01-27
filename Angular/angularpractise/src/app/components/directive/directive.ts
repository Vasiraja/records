import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-directive',
  imports: [CommonModule,FormsModule],
  templateUrl: './directive.html',
  styleUrl: './directive.css',
})
export class Directive implements OnInit{

   showngif:boolean=true;
   randomUsers :any[]=[];
   role:string="guest";
   login:boolean=false;
   stylecheck:boolean=true;
   ngmodelVal:string="";



activedeactive(){
  this.stylecheck=!this.stylecheck; 
}

     ngOnInit(): void {
     fetch("https://randomuser.me/api/").then(res=>res.json()
  .then(data=>{
    console.log(data.results)
    this.randomUsers=data.results;
    console.log(this.randomUsers)
  })
  .catch(err=>console.error(err))
)
  }
logtoggle(){
  this.login=!this.login;
}

  removediv(){
    this.showngif=!this.showngif;
  }
}
