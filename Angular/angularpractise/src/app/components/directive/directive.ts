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


  removediv(){
    this.showngif=!this.showngif;
  }
}
