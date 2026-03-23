import { Component, computed, signal, effect, input, output, model } from '@angular/core';
 
@Component({
  selector: 'app-angulareighteen',
  imports: [ ],
  templateUrl: './angulareighteen.html',
  styleUrl: './angulareighteen.css',
})
export class Angulareighteen {

  valueChange = signal(0);
  products = [
  { id: 1, name: 'Laptop', price: 1500 },
  { id: 2, name: 'Phone', price: 800 },
  { id: 3, name: 'Mouse', price: 300 }, 
];

  derivedInputSignal = input("default user");

  derivedOutputSignal = output<string>();

  modelSignal = model<string>();


  constructor() {
    effect(() => {

      console.log("Effect Triggered", this.valueChange())
    })
  }
  updateModelSignal() {
    this.modelSignal.update(it => it + "a");
  }

  triggerOutputSignal() {
    this.derivedOutputSignal.emit("here triggered the child ")
  }
  reset() {
    this.valueChange.set(0)
  }

  increment() {
    this.valueChange.update(val => val + 1);
  }
  decrement() {
    this.valueChange.update(val => val - 1);
  }

  doubleCount = computed(() => this.valueChange() * 5);

}
