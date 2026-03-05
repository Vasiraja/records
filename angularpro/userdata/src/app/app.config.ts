import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

// import {providePrimeNG} from 'primeng/config';
// import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
// import {provideAnimations} from '@angular/platform-browser/animations'
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    // provideAnimations(),
    // providePrimeNG({
    //   theme:{
    //     preset:Aura
    //   } 
    // })
  
  ]
};
 