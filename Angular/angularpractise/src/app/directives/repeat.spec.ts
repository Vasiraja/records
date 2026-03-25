import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Repeat } from './repeat';

describe('Repeat', () => {
  it('should create an instance', () => {
    const mockTemplateRef = {} as TemplateRef<any>;
    const mockViewContainer = {} as ViewContainerRef;
    const directive = new Repeat(mockTemplateRef, mockViewContainer);
    expect(directive).toBeTruthy();
  });
});
