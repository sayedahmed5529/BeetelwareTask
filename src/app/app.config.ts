import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationService } from './modules/shared/services/translation.service';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
export function initializeApp(translationService: TranslationService) {
  return (): Promise<void> => {
    return translationService.loadTranslations().toPromise();
  };
}
// Factory function to create TranslateLoader instance
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    ),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslationService],
      multi: true
    },
  ]
};
