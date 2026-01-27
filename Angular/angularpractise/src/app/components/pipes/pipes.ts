import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval, map } from 'rxjs';
 
@Component({
  selector: 'app-pipes',
  imports: [ CommonModule],
  templateUrl: './pipes.html',
  styleUrl: './pipes.css',
})
export class Pipes {

  today=new Date();
  amount=2300000;
  value=3422.1243221;
  score=34;
  user = {
  name: 'Vasi',
  age: 25,
 address: { city: 'Madurai', zip: 625535 }
};
time$ = interval(1000).pipe(map(() => new Date().toLocaleTimeString()));
 

}
