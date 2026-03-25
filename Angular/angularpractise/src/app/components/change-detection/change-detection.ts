import { Component, ChangeDetectionStrategy, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PopupComponent } from '../custom-element/custom-element';

@Component({
  selector: 'app-default-comp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <p>Default — checkCount: {{ checkCount }}</p>
    <p>count: {{ count }}</p>
    <button (click)="increment()">Increment</button>
  `
})
export class DefaultCompComponent {
  count = 0;
  checkCount = 0;

  ngDoCheck() {
    this.checkCount++;
    console.log('Default checked:', this.checkCount);
  }

  increment() { this.count++; }
}

@Component({
  selector: 'app-onpush-comp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>OnPush — checkCount: {{ checkCount }}</p>
    <p>count: {{ count }}</p>
    <button (click)="increment()">Increment</button>
  `
})
export class OnPushCompComponent {
  count = 0;
  checkCount = 0;

  ngDoCheck() {
    this.checkCount++;
    console.log('OnPush checked:', this.checkCount);
  }

  increment() { this.count++; }
}

@Component({
  selector: 'app-whitespace-false',
  standalone: true,
  preserveWhitespaces: false,
  template: `
    <p>preserveWhitespaces false (default)</p>
    <span>Hello</span>
    <span>World</span>
    <span>another text</span>
  `
})
export class WhitespaceFalseComponent { }

@Component({
  selector: 'app-whitespace-true',
  standalone: true,
  preserveWhitespaces: true,
  template: `
    <p>preserveWhitespaces true</p>
    <span>Hello</span>
    <span>World</span>
    <span>anothertext
  
    </span>
  `
})
export class WhitespaceTrueComponent { }
@Component({
  selector: 'app-change-detection',
  standalone: true,
  imports: [DefaultCompComponent, OnPushCompComponent, WhitespaceFalseComponent, WhitespaceTrueComponent,PopupComponent],
  templateUrl: './change-detection.html',
  styleUrl: './change-detection.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ChangeDetection {

  triggerAppEvent() {
    console.log('App event triggered!');
  }
} 