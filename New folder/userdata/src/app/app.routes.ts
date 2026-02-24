import { Routes } from '@angular/router';
import { Welcomepage } from './pages/welcomepage/welcomepage';
import { Loginpage } from './pages/loginpage/loginpage';
import { authGuard } from './auth-guard';
import { Signuppage } from './pages/signuppage/signuppage';
import { Formssection } from './formssection/formssection';

export const routes: Routes = [

    {path:"welcome",component:Welcomepage,canActivate:[authGuard]},
    {path:"login",component:Loginpage},
    {path:"signup",component:Signuppage},
    {path:"formsec",component:Formssection}
];
