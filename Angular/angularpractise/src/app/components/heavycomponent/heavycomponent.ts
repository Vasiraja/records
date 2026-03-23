import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-heavycomponent',
  imports: [],
  templateUrl: './heavycomponent.html',
  styleUrl: './heavycomponent.css',
})
export class Heavycomponent {

  isLoaded = signal(false);

  constructor(){
    setTimeout(()=>{
      this.isLoaded.set(true);
    },3000)
  }

}
