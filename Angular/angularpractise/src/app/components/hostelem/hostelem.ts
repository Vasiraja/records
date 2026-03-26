import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-hostelem',
  imports: [],
  templateUrl: './hostelem.html',
  host: {
    'role': 'slider',
    '[class.active]': 'isActive',
    '[tabIndex]': 'disabled ? -1 :0',
    '(click)': 'onClick()'
  },
  styleUrl: './hostelem.css',
})
export class Hostelem {
  isActive = true;
  disabled = false;

  onClick() {
    console.log('Host element clicked!');
  }


  @HostBinding('style.backgroundColor')
  bgColor = 'white';

  @HostBinding('style.border')
  border = '1px solid black';

  @HostBinding('style.opacity')
  opacity = '1';

  changeStyle() {
    this.bgColor = 'lightblue';
    this.border = '2px solid blue';
    this.opacity = '0.5';
  }

  resetStyle() {
    this.bgColor = 'white';
    this.border = '1px solid black';
    this.opacity = '1';
  }



  @HostListener('mouseenter')
  onMouseEnter() {
    this.bgColor = 'lightblue';
    this.border = '2px solid blue';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.bgColor = 'white';
    this.border = '1px solid black';
  }

  @HostListener('click')
  Click() {
    console.log('Host element clicked!');
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);
  }
}
