import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from './services/auth';

export const canactivegGuard: CanActivateFn = (route, state) => {



  const authService = inject(Auth);
  console.log("Checking permissions....")
  return authService.isAdmin();

};
