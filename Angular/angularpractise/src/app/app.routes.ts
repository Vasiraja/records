import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Directive } from './components/directive/directive';
import { Forms } from './components/forms/forms';
import { Encapsulation } from './components/encapsulation/encapsulation';
import { Pipes } from './components/pipes/pipes';
import { Contentprojection } from './components/contentprojection/contentprojection';
import { Bindings } from './components/bindings/bindings';
import { Login } from './login/login';
import { Success } from './success/success';
import { authGuard } from './auth-guard';
import { Analytics } from './dashboard/analytics/analytics';
import { dashboardchildGuard } from './dashboardchild-guard';
import { Dashboard } from './dashboard/dashboard/dashboard';
import { Reports } from './dashboard/reports/reports';
import { UnsavedChangesGuard } from './guards/unsaved-changes-guard';
import { Rxjsangular } from './components/rxjsangular/rxjsangular';
import { Inputoutputdec } from './components/inputoutputdec/inputoutputdec';
import { Rxjstask } from './components/rxjstask/rxjstask';
import { Angulareighteen } from './components/angulareighteen/angulareighteen';
import { Hostelem } from './components/hostelem/hostelem';
import { Queries } from './components/queries/queries';
import { Domapi } from './components/domapi/domapi';
import { Inheritance } from './components/inheritance/inheritance';
import { DynamicRender } from './components/dynamic-render/dynamic-render';
import { ChangeDetection } from './components/change-detection/change-detection';
import { CustomElementComponent } from './components/custom-element/custom-element';
import { Eventlisteners } from './components/eventlisteners/eventlisteners';

export const routes: Routes = [

    { path: "", component: Home },
    { path: "directive", component: Directive },
    { path: "forms", component: Forms },
    { path: "enc", component: Encapsulation },
    { path: "pipes", component: Pipes },
    { path: "contentprojection", component: Contentprojection },
    { path: "binding", component: Bindings },
    { path: "inputoutput", component: Inputoutputdec },
    { path: "rxjst", component: Rxjstask },





    { path: "login", component: Login, canDeactivate: [UnsavedChangesGuard] },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivateChild: [dashboardchildGuard],
        children: [
            { path: 'reports', component: Reports },
            { path: 'analytics', component: Analytics },
        ]
    },
    {
        path: "success", component: Success, canActivate: [authGuard]
    },
    {
        path: "rxjs", component: Rxjsangular
    },
    {
        path: "18", component: Angulareighteen
    },
    {
        path: "host", component: Hostelem
    },
    {
        path: "query", component: Queries
    },
    {
        path: "dom", component: Domapi
    },
    {
        path: "inher", component: Inheritance
    },
    {
        path: "dynamicrender", component: DynamicRender
    },
    {
        path: "changedetection", component: ChangeDetection
    },
    {
        path: "customelement", component: CustomElementComponent
    },
    {
        path: "event", component: Eventlisteners
    },




    {
        path: "", redirectTo: "/login", pathMatch: "full"
    },

];
