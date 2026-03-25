import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventlisteners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventlisteners.html',
  styleUrl: './eventlisteners.css',
})
export class Eventlisteners {

  students = [
    'Vasi',
    'Raja',
    'Kumar',
    3,
    4
  ];
  onClick() {
    console.log('Button clicked');
  }

  onKeyUp(event: any) {
    console.log('Key pressed:', event.key);
  }

  onEnter() {
    console.log('Enter key pressed');
  }

  onShiftEnter() {
    console.log('Shift + Enter pressed');
  }

  onCtrlA() {
    console.log('Ctrl + A pressed');
  }

  onAltS() {
    console.log('Alt + S pressed');
  }

  onHover() {
    console.log('Mouse entered');
  }

  onLeave() {
    console.log('Mouse left');
  }

  onFocus() {
    console.log('Input focused');
  }

  onBlur() {
    console.log('Input lost focus');
  }
}