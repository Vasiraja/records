import { CanActivateFn } from '@angular/router';
import { Auth } from './services/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const adminChildGuard: CanActivateFn = (route, state) => {
 const auth=inject(Auth);
  const router=inject(Router);


  if(auth.isAuthenticated()){
    return true
  }
  else{
return auth.isAuthenticated()
    ? true
    : router.createUrlTree(['/login']);   
   }};
