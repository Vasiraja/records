import { Component } from '@angular/core';
import { Home } from '../home/home';


class parentClass {
  value = 'Hello from Base Class!';

  greet() {
    console.log('Greet from base:', this.value);
  }
}
@Component({
  selector: 'app-inheritance',
  imports: [],
  templateUrl: './inheritance.html',
  styleUrl: './inheritance.css',
})
export class Inheritance extends parentClass {



  extra = 'Hello from Child Component!';


  constructor() {
    super();
    this.greet();


  }





}
