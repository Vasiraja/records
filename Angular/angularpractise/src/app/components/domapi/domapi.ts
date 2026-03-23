import { afterNextRender, afterRenderEffect, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-domapi',
  imports: [],
  templateUrl: './domapi.html',
  styleUrl: './domapi.css',
})
export class Domapi {


  @ViewChild('myBox') myBox!: ElementRef;
  @ViewChild('myBox') myBox2!: ElementRef;
  value = "";
  count = 0;


  constructor(private elem: ElementRef, private renderer: Renderer2) {
    console.log(this.elem.nativeElement);


    afterRenderEffect(() => {
      console.log("Updated Count", this.count)
    })
    afterNextRender(() => {
      console.log('afterNextRender — runs ONCE only!');
      this.myBox?.nativeElement.focus();
    });
  }
  addStyle() {
    this.renderer.setStyle(this.myBox2.nativeElement, 'backgroundColor', 'lightblue');
    this.renderer.setStyle(this.myBox2.nativeElement, 'border', '2px solid blue');
    this.renderer.setStyle(this.myBox2.nativeElement, 'padding', '10px');
  }
   removeStyle() {
     this.renderer.removeStyle(this.myBox2.nativeElement, 'backgroundColor');
    this.renderer.removeStyle(this.myBox2.nativeElement, 'border');
    this.renderer.removeStyle(this.myBox2.nativeElement, 'padding');
  }
   addClass() {
     this.renderer.addClass(this.myBox2.nativeElement, 'active');
   }

  createElement() {
     const p = this.renderer.createElement('p');
     const text = this.renderer.createText('Created by Renderer2!');
     this.renderer.appendChild(p, text);
    this.renderer.appendChild(this.myBox2.nativeElement, p);
  }

  getInputValue() {
    this.value = this.myBox.nativeElement.value;
  }

  focusInput() {
    this.myBox.nativeElement.focus()
  }
  changeInputStyle() {
    const inputsRef = this.myBox.nativeElement.style;

    inputsRef.backgroundColor = "red";
    inputsRef.color = "#fff";
  }
  updateCount() {

    this.count = this.count + 1;
  }


}
