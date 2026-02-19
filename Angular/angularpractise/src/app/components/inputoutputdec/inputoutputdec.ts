import { Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { concat, concatMap, debounceTime, delay, exhaustMap, from, mergeMap, of, Subject, switchAll, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputoutputdec',
  imports: [CommonModule, FormsModule],
  templateUrl: './inputoutputdec.html',
  styleUrl: './inputoutputdec.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class Inputoutputdec {


  @Input() price: number = 0;
  @Output() priceClicked = new EventEmitter<number>();
  @Input() passCount: number = 0;
  searchVar: string = "";


  @Input() childVar: string = "";

  @Output() stocksget = new EventEmitter<number>();




  @Input() outVariableName: string = "";

  inputDebounce = new Subject<string>();





  constructor() { }

  implementOutputtrigger() {
    this.stocksget.emit(34);
  }
  passPrice() {
    this.priceClicked.emit(this.price)

  }
  alerting() {
    alert(this.outVariableName);


  }
  searchaction() {
    this.inputDebounce.next(this.searchVar)


    this.inputDebounce.pipe(
      debounceTime(500)
    ).subscribe(console.log)
  }

  triggering() {
    of(14,22,65,22,55,33).pipe(
      exhaustMap(x=>of(x).pipe(delay(1000)))
    ).subscribe(console.log);



    of(14,22,65,22,55,33).pipe(
      switchMap(x=>of(x).pipe(delay(1000)))
    ).subscribe(console.log)
    of(14,22,65,22,55,33).pipe(
      mergeMap(x=>of(x).pipe(delay(1000)))
    ).subscribe(console.log)
    
    of(14,22,65,22,55,33).pipe(
      concatMap(x=>of(x).pipe(delay(1000)))
    ).subscribe(console.log)
    
  }



}
