import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Directive } from './components/directive/directive';
export const routes: Routes = [

    {path:"",component:Home},
    {path:"directive",component:Directive}

];
