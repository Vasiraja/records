import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [

  {
    path: "",
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/welcomepage/welcomepage').then(m => m.Welcomepage)
  },

  {
    path: "login",
    loadComponent: () =>
      import('./pages/loginpage/loginpage').then(m => m.Loginpage)
  },

  {
    path: "signup",
    loadComponent: () =>
      import('./pages/signuppage/signuppage').then(m => m.Signuppage)
  },

  {
    path: "formsec",
    loadComponent: () =>
      import('./formssection/formssection').then(m => m.Formssection)
  },

  {
    path: "messages",
    canActivate: [authGuard],

    loadComponent: () =>
      import('./components/messages/messages').then(m => m.Messages)
  },

  {
    path: "polllist",
    canActivate: [authGuard],

    loadComponent: () =>
      import('./components/polllists/polllists').then(m => m.Polllists)
  },

  {
    path: "poll",
    canActivate: [authGuard],

    loadComponent: () =>
      import('./components/poll/poll').then(m => m.Poll)
  }

];