import { Component, OnInit } from '@angular/core';
import { combineLatest, delay, forkJoin, of, race } from 'rxjs';

@Component({
  selector: 'app-rxjstask',
  imports: [],
  templateUrl: './rxjstask.html',
  styleUrl: './rxjstask.css',
})
export class Rxjstask implements OnInit {
  ngOnInit(): void {
  
        // console.log(this.serverC$.subscribe(console.log));






  }
triggerrxjs(){
        combineLatest([this.serverA$,this.serverB$,this.serverC$]).subscribe(console.log)

}
  serverA$=of(23,44,11).pipe(delay(10000));
  serverB$=of(32,443,231).pipe(delay(2000));
  serverC$=of("this server","another one").pipe(delay(2000));

 

}
