import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Toast as BsToast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  imports: [ ],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  @ViewChild('liveToast') toastElement!: ElementRef;

  constructor(private cdr:ChangeDetectorRef){}

  showToast(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.cdr.detectChanges();


    const toast = new BsToast(this.toastElement.nativeElement,{
      delay:1000
    });
    toast.show();
  }


  @Input() message: string = "";
  @Input() title: string = "";




}
