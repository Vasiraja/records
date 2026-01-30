import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
 import { Login } from '../login/login';
@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<Login> {
  canDeactivate(
    component: Login
  ): boolean {
    if (component.isDirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
}
  