import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {

  constructor(private el: ElementRef) { }


  @HostListener("mouseenter")
  changeColor() {
    this.el.nativeElement.style.backgroundColor = "yellow";
    this.el.nativeElement.style.color = "red";
    this.el.nativeElement.style.cursor = "pointer"
  }

  @HostListener("mouseleave")
  dropColor() {
    this.el.nativeElement.style.backgroundColor = "#fff";
    this.el.nativeElement.style.color = "#000"
  }

  @HostListener("click")
  mouseclick() {
    this.el.nativeElement.style.color = "blue";
  }


}
