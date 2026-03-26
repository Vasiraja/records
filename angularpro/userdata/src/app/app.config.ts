import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

// import {providePrimeNG} from 'primeng/config';
// import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './loading.interceptor';
// import {provideAnimations} from '@angular/platform-browser/animations'
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor])
    ),
    // provideAnimations(),
    // providePrimeNG({
    //   theme:{
    //     preset:Aura
    //   } 
    // })

  ]
};
