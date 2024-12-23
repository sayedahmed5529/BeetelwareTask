import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BeetelwareTask';

  
  constructor(
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService) {
    this.initLanguage();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true; //enables core ripple functionality
  }
  initLanguage() {
    this.translate.addLangs(['en', 'ar']);
    const lang = localStorage.getItem('lang') || 'en';
    localStorage.setItem('lang', lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.changePageDirection();
  }

  changePageDirection() {
    if (this.translate.currentLang == 'en') {
      document.documentElement.setAttribute('dir', 'ltr');
    } else {
      document.documentElement.setAttribute('dir', 'rtl');
    }
  }
}
