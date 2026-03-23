import { AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-queries',
  imports: [],
  templateUrl: './queries.html',
  styleUrl: './queries.css',
})
export class Queries implements AfterViewInit {

  @ViewChild('myInput') myInput!: ElementRef;
  inputvalue = "";

  @ViewChild('viewInput') viewInput!: ElementRef;
  @ViewChildren('viewInputs') viewInputs!: QueryList<ElementRef>;

  @ContentChild('projectedInput')    projectedInput!: ElementRef;
  @ContentChildren('projectedInputs') projectedInputs!: QueryList<ElementRef>;



  ngAfterViewInit() {

    console.log(this.myInput.nativeElement)
    console.log('All inputs:', this.viewInput);
    console.log('Total inputs:', this.viewInputs.length);

  }
  focusInput() {
    this.myInput.nativeElement.focus();
  }
  getValue() {
    this.inputvalue = this.myInput.nativeElement.value;
  }
  focusAll() {
    this.viewInputs.forEach(input => {
      // input.nativeElement.focus();
      input.nativeElement.style.border = '2px solid blue';
      input.nativeElement.style.backgroundColor = 'lightyellow';
    });
  }

  highlightAll() {
    this.projectedInputs.forEach(input => {
      input.nativeElement.style.border = '2px solid green';
      input.nativeElement.style.backgroundColor = 'lightgreen';
    });
  }

  clearAlls() {
    this.projectedInputs.forEach(input => {
      input.nativeElement.value = '';
      input.nativeElement.style.border = '1px solid black';
      input.nativeElement.style.backgroundColor = 'white';
    });
  }
  clearAll() {
    this.viewInputs.forEach(input => {
      input.nativeElement.value = '';
    });
  }

}
