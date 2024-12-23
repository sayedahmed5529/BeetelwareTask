import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CommonModule, PlatformLocation } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items!: MenuItem[];
  pageTitle!: string;


  constructor(
    public _translate: TranslateService,
private _auth:AuthService, 
    private _location: PlatformLocation,
    private _route: ActivatedRoute,
    private _router: Router) {
   
  }

  toggleLanguage() {
    if (this._translate.currentLang === 'en') {
      this._translate.use('ar');
      localStorage.setItem('lang', 'ar');
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      this._translate.use('en');
      localStorage.setItem('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
    }
    const pathname = this._location.pathname;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([pathname]);
    });
  }
  logout() {
    this._auth.logout()
      .subscribe(success => {
        if (success) this._router.navigateByUrl('auth/login');
      })
  }
}

