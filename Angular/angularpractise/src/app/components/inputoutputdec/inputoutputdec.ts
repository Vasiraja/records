import { Component, EventEmitter, Input, Output,  } from '@angular/core';

@Component({
  selector: 'app-inputoutputdec',
  imports: [ ],
  templateUrl: './inputoutputdec.html',
  styleUrl: './inputoutputdec.css',
})
export class Inputoutputdec {




  @Input()  childVar: string="";

  @Output() stocksget=new EventEmitter<number>();

 
  constructor(){}

  implementOutputtrigger(){
    this.stocksget.emit(34);
  }


  

}
