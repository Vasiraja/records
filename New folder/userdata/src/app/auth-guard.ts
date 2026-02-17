import { CanActivateFn ,Router} from '@angular/router';
import { inject } from '@angular/core';
import { Userserv } from './services/userserv';
import { jwtDecode } from 'jwt-decode';
export const authGuard: CanActivateFn = (route, state) => {

  const authservie = inject(Userserv);
  const router=inject(Router);

const token = localStorage.getItem('token');

if(!token){
  router.navigate(['/login']);
  return false;
}


 try {
    const decoded: any = jwtDecode(token);

     const now = Math.floor(Date.now() / 1000);  
    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem('token');  
      router.navigate(['/login']);
      return false;
    }
  
    return true;  
  } catch (e) {
     localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }

};