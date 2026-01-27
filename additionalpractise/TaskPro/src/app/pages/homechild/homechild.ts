import { Component, Input ,OnChanges} from '@angular/core';
 

@Component({
  selector: 'app-homechild',
  imports: [],
  templateUrl: './homechild.html',
  styleUrl: './homechild.css',
})
export class Homechild implements OnChanges{

  @Input() getValue:string | undefined;

  ngOnChanges( ) {
    console.log("Triggered");
    console.log(this.getValue)

 }
  
}
