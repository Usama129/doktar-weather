import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { OwmApiKeyInterceptor } from './core/interceptors/owm-api-key.interceptor';

export const OWM_API_KEY = new InjectionToken<string>('OWM_API_KEY'); // openweathermap api key injection token
export const OWM_BASE_URL = new InjectionToken<string>('OWM_BASE_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([OwmApiKeyInterceptor])
    ),
    { provide: OWM_API_KEY, useValue: environment.owmApiKey },
    { provide: OWM_BASE_URL, useValue: environment.owmApiBaseUrl }
  ]
};
