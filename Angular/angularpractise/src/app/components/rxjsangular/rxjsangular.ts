import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, catchError, combineLatest, concatMap, debounceTime, delay, from, mergeMap, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { map } from 'rxjs';

import { filter } from 'rxjs';
 
@Component({
  selector: 'app-rxjsangular',
  imports: [FormsModule],
  templateUrl: './rxjsangular.html',
  styleUrl: './rxjsangular.css',
})
export class Rxjsangular {


  obserVar: string = '';

  arrVal: any[] = [1, 'value', 43.22];

  newMappingValue: number[] = [43, 23, 11, 56, 43, 4];
  a$ = new BehaviorSubject<number>(21);
  b$ = new BehaviorSubject<number>(44);
searchInput:string="";
  searchSubject = new Subject<string>();


  startObserver() {
    const obs = new Observable<string>((observable) => {

      observable.next('first Observable value here..');
      observable.next("Another Observable value here...");
      observable.next("final value here...");
      observable.complete();

    })


    obs.subscribe((items) => {
      console.log(items);
      this.obserVar = items;
    })



  }


  switchmaptrigger() {
    of(1, 2, 3).pipe(
      switchMap(x => of(x * 10).pipe(delay(1000)))
    )
      .subscribe(console.log);

  }
  mergemaptrigger() {
    of(1, 2, 3).pipe(
      mergeMap(x => of(x * 10).pipe(delay(1000)))
    )
      .subscribe(console.log);

  }
  concatmaptrigger() {
    of(1, 2, 3).pipe(
      concatMap(x => of(x * 10).pipe(delay(1000)))
    )
      .subscribe(console.log);

  } 
  maptrigger() {
    from(this.newMappingValue).pipe(
      tap(item => console.log("before map: ", item)),
      map(item => {
        const mapped = item * 2;

        console.log('Mapped value:', mapped);
        return mapped;
      }),
      tap(item => console.log("after map: ", item)),

    )
      .subscribe(mappedVal => {
        console.log('Map trigger subscribe:', mappedVal);
      });
  }
  runCatchError() {
    of(1, 2, 3)
      .pipe(
        map(num => {
          if (num === 2) {
            throw new Error('Something went wrong at 2');
          }
          return num * 10;
        }),
        tap(x => console.log('After map:', x)),
        catchError(err => {
          console.log('Caught error:', err.message);
          return of(999);
        })
      )
      .subscribe(final => console.log('Final:', final));
  } 
  filtertrigger() {
    from(this.newMappingValue).pipe(
      filter(item => {
        const passes = item === 23;
        console.log('Filter check:', item, 'Passes?', passes);
        return passes;
      })
    )
      .subscribe(filteredVal => {
        console.log('Filter trigger subscribe:', filteredVal);
      });
  }
  triggerbeh() {
    const beh = new BehaviorSubject<number>(0);

    beh.subscribe(console.log);


    beh.next(432);
    beh.next(4);
    beh.next(22);
    beh.next(34343);


    console.log("current value is ", beh.getValue());


  } 
  triggersub() {

    const sub = new Subject<number>();

    sub.subscribe(console.log);


    sub.next(43);
    sub.next(432);
    sub.next(409);
    sub.complete();



  }
  triggercombinelatest() {


    combineLatest([this.a$, this.b$]).subscribe(([a, b]) => {
      console.log('a value: ' + a);
      console.log('b value: ' + b);



    });




  }
  incrAvalue() {
    this.a$.next(this.a$.value + 1);


  }
  incrBValue() {
    this.b$.next(this.b$.value + 1);
  }
  emitoffrom() {

    of(this.newMappingValue).subscribe((items) => {
      console.log("Emit array values without observable ")
      console.log(items);
    })

    from(this.arrVal).subscribe((items) => {
      console.log("Converting through from() method and show here")
      console.log(items);
    })

  }
  debouncelisten(){
    console.log("debounce function listening")
     this.searchSubject
      .pipe(
        debounceTime(500) 
      )
      .subscribe(value => console.log('Search term:', value));


  }

  onchangeevent( ){
    this.searchSubject.next(this.searchInput);
  }
}
