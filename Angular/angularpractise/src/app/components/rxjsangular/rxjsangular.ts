import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BehaviorSubject, catchError, combineLatest, concatAll, concatMap,
  debounceTime, delay, delayWhen, distinct, distinctUntilChanged, distinctUntilKeyChanged,
  exhaustAll, first, forkJoin, from, interval, last, mapTo, mergeAll, mergeMap, Observable,
  of, pluck, race, repeat, retry, skip, skipLast, skipWhile, Subject, switchAll,
  switchMap, take, takeLast, takeWhile, tap, timer
} from 'rxjs';
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
  searchInput: string = "";
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
  debouncelisten() {
    console.log("debounce function listening")
    this.searchSubject
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => console.log('Search term:', value));


  }

  onchangeevent() {
    this.searchSubject.next(this.searchInput);
  }

  nexterrorcomplete() {

    const obse = new Observable<any>(obser => {
      obser.next(32);
      obser.next("string value");
      obser.error("Error found here");
      obser.next("Not print in the output due to error found above obser");
      obser.complete()

    })

    obse.subscribe(
      {
        next: value => console.log("next block: ", value),
        error: err => console.error("Error block: ", err),
        complete: () => console.log("completed observables")
      }
    )


  }
  concatall() {

    const sourceVar$ = of(1, 2, 3, 4).pipe(
      map(items => of(items * 2).pipe(delay(1000)))
    );
    sourceVar$.pipe(concatAll())
      .subscribe(val => console.log('val: ', val));
  }
  mergeall() {

    const sourceVar$ = of(1, 2, 3, 4).pipe(
      map(items => of(items * 2).pipe(delay(1000)))
    );
    sourceVar$.pipe(mergeAll())
      .subscribe(val => console.log('val: ', val));
  }
  switchall() {

    const sourceVar$ = of(1, 2, 3, 4).pipe(
      map(items => of(items * 2).pipe(delay(1000)))
    );
    sourceVar$.pipe(switchAll())
      .subscribe(val => console.log('val: ', val));
  }
  exhaustMap() {

    const sourceVar$ = of(1, 2, 3, 4).pipe(
      map(items => of(items * 2).pipe(delay(1000)))
    );
    sourceVar$.pipe(exhaustAll())
      .subscribe(val => console.log('val: ', val));
  }
  timer() {
    timer(2000, 900).subscribe(console.log);
  }
  interval() {
    interval(1000).subscribe(console.log);
  }

  forkjoin() {

    const a$ = of('A').pipe(delay(1000));
    const b$ = of('B').pipe(delay(100));
    const c$ = of('C').pipe(delay(4300));

    forkJoin([a$, b$, c$]).subscribe(values => {
      console.log(values);
    })
  }

  race() {

    const a$ = of('A').pipe(delay(1000));
    const b$ = of('B').pipe(delay(10000));
    const c$ = of('C').pipe(delay(4300));

    race([a$, b$, c$]).subscribe(values => {
      console.log(values);
    })
  }
  mapto() {

    of(432, 55, 12, 55).pipe(
      tap(val => console.log("Before Changing values:", val)),
      mapTo('changedVal'),
      tap(val => "After chanigng val: " + val),

    ).subscribe(console.log);


  }
  pluck() {
    const valObj$ = of(
      { name: "vicky", age: 24, mark: 323 },
      { name: "ranway", age: 29, mark: 432 });

    valObj$.pipe(
      pluck('name'))
      .subscribe(val => console.log(val))


  }
  filtergroup() {
    of(1, 2, 3, 4, 5, 6, 7, 8).pipe(
      filter((item) => item % 2 === 0),


    ).pipe(first())

      .subscribe(console.log)
    of(1, 2, 3, 4, 5, 6, 7, 8).pipe(
      filter((item) => item % 2 === 0),


    ).pipe(last())

      .subscribe(console.log)
  } 
   
  take() {
    of(1, 2, 3, 4, 5, 6, 7, 8).pipe(
      tap(() => console.log("--Taking first values with count")),
      take(4),
    ).subscribe(console.log);

    of(1, 2, 3, 4, 5, 6, 7, 8).pipe(
      tap(() => console.log("Taking values which satisfy the while condition")),
      takeWhile(val => val < 5),
    ).subscribe(console.log);

    of(1, 2, 3, 4, 5, 6, 7, 8).pipe(
      tap(() => console.log("Taking values from last")),
      takeLast(4),
    ).subscribe(console.log);
  } 
  skiptrigger() {

    of(1, 2, 3, 4, 5, 6, 7, 8).pipe(
      skip(3)
    ).subscribe(console.log)


    of(1, 2, 3, 4, 5, 6, 7, 8).pipe(
      skipWhile(val => val < 5)
    ).subscribe(console.log)
    of(1, 2, 3, 4, 5, 6, 7, 8).pipe(
      tap(() => console.log("----------------")),
      skipLast(3)
    ).subscribe(console.log)
  }
  distinct() {
    console.log("Given Numbers 2,3,4,4,5,2,1,1,3,3,5,4,2,1,5");

    console.log("distinct")
    of(2, 3, 4, 4, 5, 2, 1, 1, 3, 3, 5, 4, 2, 1, 5).pipe(
      distinct()
    ).subscribe(console.log)

    console.log("distinct until changed")
    of(2, 3, 4, 4, 5, 2, 1, 1, 3, 3, 5, 4, 2, 1, 5).pipe(
      distinctUntilChanged()
    ).subscribe(console.log)


  }

  delayfunc() {
    of(1, 2, 3).pipe(
      delay(5000)
    ).subscribe(console.log)

    of(1, 2, 3).pipe(
      delayWhen(val => timer(val * 1000))
    ).subscribe(console.log)
  }
 
  repeatfunc() {
    of(1, 2, 3).pipe(
      repeat(4)
    ).subscribe(console.log)
  }
 
  retry() {

    of(1, 2, 3)
      .pipe(
        map(val => {
          if (val === 3) throw new Error('Boom');
          return val;
        }),
        retry(2)
      )
      .subscribe({
        next: v => console.log(v),
        error: e => console.log('Final Error:', e.message)
      });
  } 
}


