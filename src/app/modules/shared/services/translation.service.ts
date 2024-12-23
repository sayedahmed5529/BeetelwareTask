import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly translationFiles = [
    'home/ar',
    'home/en'
  ];

  constructor(
    private _translate: TranslateService,
    private _http: HttpClient) { }

  loadTranslations(): Observable<void> {
    const requests = this.translationFiles.map(file =>
      this._http.get(`/assets/i18n/${file}.json`).pipe(
        catchError(err => {
          console.error(`Error loading translation file ${file}:`, err);
          return of({});
        })
      )
    );

    return forkJoin(requests).pipe(
      tap(responses => {
        responses.forEach((response: any, index) => {
          const lang = this.getLangFromFile(this.translationFiles[index]);
          this._translate.setTranslation(lang, response, true);
        });
        console.log('Translations loaded');
      }),
      map(() => void 0),
      catchError(err => {
        console.error('Error loading translations:', err);
        return of(void 0);
      })
    );
  }

  private getLangFromFile(fileName: string): string {
    // Extract language code from file name (e.g., 'customers/en' -> 'en')
    const parts = fileName.split('/');
    return parts[1];
  }
}
