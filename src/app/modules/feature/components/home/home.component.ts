import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AuthService } from '../../../auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { ToolbarModule } from 'primeng/toolbar';
import { PopupComponent, PopupService } from '../../../shared/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
     FormsModule, 
    PaginatorModule, 
    NavbarComponent, 
    IconFieldModule,
    ToolbarModule,
    PopupComponent,
    InputIconModule,
    TranslateModule,
    InputTextModule, 
    TableModule,
    ButtonModule, 
    FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  userRole: 'user' | 'admin' = 'user';
  lang: any = "en"
  users: User[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _auth: AuthService,
    private _translate :TranslateService,
    private _popup :PopupService,
    private _User: UserService,) {
    this.userRole = this._auth.userData()?.role || 'user';

  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this._User.getUsers().pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.users = res ||[]
      }
    )
  }
  addUser() {
      this._popup.open(UserFormComponent, {
        title: this._translate.instant('AddNew'),
        position: this._translate.currentLang === 'ar' ? 'left' : 'right'
      }).afterClosed.subscribe((refresh) => refresh && this.getUsers());
    
  
  }
  editUser(user: any) {
    this._popup.open(UserFormComponent, {
      title: this._translate.instant('EDIT_USER'),
      position: this._translate.currentLang === 'ar' ? 'left' : 'right',
      data: user.id
    }).afterClosed.subscribe((refresh) => refresh && this.getUsers());
  }
  deleteUser(user: User) {
    this._User.deleteUser(user.id);
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
