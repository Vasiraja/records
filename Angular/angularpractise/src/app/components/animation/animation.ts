import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, query, stagger } from '@angular/animations';
@Component({
  selector: 'app-animation',
  imports: [CommonModule],
  templateUrl: './animation.html',
  styleUrl: './animation.css',
  animations: [
    trigger('boxState', [
      state('small', style({ backgroundColor: '#3498db', transform: 'scale(1)' })),
      state('large', style({ backgroundColor: '#e74c3c', transform: 'scale(1.2)' })),
      transition('small <=> large', animate('300ms ease-in-out'))
    ]),

     trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]),

     trigger('wobble', [
      transition('* => walk', [
        animate('1s', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-20px)', offset: 0.2 }),
          style({ transform: 'translateX(10px)', offset: 0.4 }),
          style({ transform: 'translateX(-20px)', offset: 0.6 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ]),

     trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Animation {
  boxSize = 'small';
  showPanel = false;
  wobbleState = '';
  items = ['Apple', 'Banana', 'Orange', 'Mango'];

  toggleSize() {
    this.boxSize = this.boxSize === 'small' ? 'large' : 'small';
  }

  triggerWobble() {
    this.wobbleState = 'walk';
    setTimeout(() => this.wobbleState = '', 1000)
  }
}
