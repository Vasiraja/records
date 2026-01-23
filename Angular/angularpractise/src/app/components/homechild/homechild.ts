import { Component, OnChanges, SimpleChanges, ViewChild ,ElementRef, AfterContentInit, AfterContentChecked, OnInit, AfterViewInit,AfterViewChecked, OnDestroy} from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-homechild',
  imports: [],
  templateUrl: './homechild.html',
  styleUrl: './homechild.css',
})
export class Homechild implements OnChanges,AfterContentInit,AfterContentChecked,OnInit,AfterViewInit ,AfterViewChecked,OnDestroy{
  ngOnDestroy(): void {
    console.log("Child destroyed successfully")
  }
  ngAfterViewChecked(): void {
     console.log("view check triggered which means modification in view")
  }
 
    @ViewChild ('parentproperty') parentpropertyel!: ElementRef;
    @Input() childVariable:string | undefined;
    @ViewChild('title') titleViewInit!:ElementRef;
    @ViewChild('additionaltitle') additionaltitle!:ElementRef;
  ngOnInit(): void {
     
    // this.titleViewInit.nativeElement.style.color="blue";
  }
   
  ngAfterContentChecked(): void {
     console.log("Outside content changed")
  }
  ngAfterContentInit(): void {
     console.log("Outside content projected ...")
  }
 


    
  ngOnChanges(): void {
    
    console.log("Input Changes Triggered");

  }
   ngAfterViewInit(): void {
      this.titleViewInit.nativeElement.style.color="blue";
  }



triggerngafterviewcheck(){
  this.additionaltitle.nativeElement.style.color="red";
}

  


}
