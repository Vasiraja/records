import { ElementRef } from '@angular/core';
import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const mockEl = new ElementRef(document.createElement('div'));

    const directive = new Highlight(mockEl);
    expect(directive).toBeTruthy();
  });
});
