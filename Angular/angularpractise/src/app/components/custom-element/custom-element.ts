import { Component, Input, Output, EventEmitter, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements';
@Component({
  selector: 'app-popup',
  standalone: true,
  template: `
    <div style="
      background: #009cff;
      padding: 16px;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    ">
      <span>{{ message }}</span>
      <button (click)="closed.emit()"> Close</button>
    </div>
  `
})
export class PopupComponent {




  @Input() message = 'Hello from Popup!';
  @Output() closed = new EventEmitter<void>();


}

@Component({
  selector: 'app-custom-element',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './custom-element.html',
})
export class CustomElementComponent {
  constructor(private injector: Injector) {

    const PopupElement = createCustomElement(PopupComponent, {
      injector: this.injector
    }); 

    customElements.define('my-popup', PopupElement);
  }
}