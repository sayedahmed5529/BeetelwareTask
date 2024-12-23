
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import {  Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
const PRIMENG_MODULES = [
  ButtonModule,
  CheckboxModule,
  InputTextModule,
  PasswordModule,
  ToastModule,
  TranslateModule
];
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ...PRIMENG_MODULES],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
    }
`]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _auth: AuthService) {
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  login() {
    const { email, password } = this.loginForm.value;
    this._auth.login(email, password)
      .subscribe(success => {
        if (success) {
          this._router.navigateByUrl('/home');
        } else {
          this._toastr.error('Invalid User Email or Password', 'Login Failed');
        }

      })
  }
}
