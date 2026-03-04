import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Accesscontrol {
  
  private currentUserRole :string="";


  constructor(){
    this.currentUserRole=localStorage.getItem('userType') ||  'user';

  }
   refreshRole(): void {
    this.currentUserRole = localStorage.getItem('userType') || 'guest';
  }


  private getRole():string{
    return this.currentUserRole;

  }
  
  isAdmin ():boolean{
    return this.getRole().toLowerCase() === "admin";
  }
  isUser():boolean{
    return this.getRole().toLowerCase() === "user";
  }
  isGuest():boolean{
    return this.getRole().toLowerCase()==="guest";
  }

  canEdit():boolean{
    return this.isAdmin();
  }

  canDelete():boolean{
    return this.isAdmin();
  }


}
