import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Directive } from './components/directive/directive';
import { Forms } from './components/forms/forms';
import { Encapsulation } from './components/encapsulation/encapsulation';
import { Pipes } from './components/pipes/pipes';
import { Contentprojection } from './components/contentprojection/contentprojection';
 export const routes: Routes = [

    {path:"",component:Home},
    {path:"directive",component:Directive},
    {path:"forms",component:Forms},
    {path:"enc",component:Encapsulation},
    {path:"pipes",component:Pipes},
    {path:"contentprojection",component:Contentprojection}

];
