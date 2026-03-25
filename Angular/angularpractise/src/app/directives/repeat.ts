import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]',
})
export class Repeat {

  constructor(private tempRef:TemplateRef<any>,private viewcont:ViewContainerRef) { }



  @Input() set appRepeat(times:number){
    this.viewcont.clear();

    for(let i=0;i<times;i++){
      this.viewcont.createEmbeddedView(this.tempRef);
    }
  }

}
