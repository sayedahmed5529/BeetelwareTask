import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PopupService } from '../../../shared/dialog';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../interfaces/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder,
    private _popup: PopupService,
    private _user :UserService,
    private _translate:TranslateService,
    private _toastr:ToastrService
  ) {

  }
  ngOnInit(): void {
    const userId = this._popup.getData<number>();

    this.initUserForm();
    userId &&  this.getUserById(userId);
  }
  private getUserById(userId: number) {
    this._user
      .getUserById(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const user = res ;
        this.userForm.patchValue(user!);

      });
  }

  initUserForm() {
    this.userForm = this._fb.group({
      id: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      status: ['active'],
      role: ['user', Validators.required]
    });
  }
  save() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;
    const payload = this.userForm.getRawValue();
   
    const request$ = payload.id ?
      this._user.updateUser(payload) :
      this._user.addUser(payload);
    request$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => this.afterSavingDone(this.userForm.getRawValue()));
  }

  private afterSavingDone( user: User) {
    this._translate.get(+user.id >0 ? 'UPDATED_SUCCESSFULLY' :'ADDED_SUCCESSFULLY', { name:user.email  })
      .subscribe((msg: string) => this._toastr.success(msg));
    this._popup.close(  );
  }

  
  close = () => this._popup.close();

}
