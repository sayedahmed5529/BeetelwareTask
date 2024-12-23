import { DialogModule } from 'primeng/dialog';
import { Component, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupConfig, PopupConfigIntialData } from './config/popup.config';
import { PopupService } from './service/popup.service';
import { first, Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'shared-ui-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  private dynamicContainer!: ViewContainerRef;

  toggle: boolean = false;
  config: PopupConfig = PopupConfigIntialData;

  private closed$: Subject<any> = new Subject<any>();

  constructor(public _popup: PopupService, private _router: Router) {
    this._popup.open = this.open.bind(this);
    this._popup.getData = this.getData.bind(this);
    this._popup.close = this.close.bind(this);
    this._router.events.subscribe(
      (res) => res instanceof NavigationEnd && this.close(false)
    );
  }

  open(component: Type<any>, config: PopupConfig) {
    this.toggle = true;
    this.config = {
      ...this.config,
      ...config,
      isModal: config.isModal == false ? false : true,
      dismissableMask: config.dismissableMask === false ? false : true,
      data: config.data ? config.data : null,
      width: config.width ? config.width : '',
      height: config.height ? config.height : '',
      position: config.position ? config.position : 'right',
      closable:config.closable ?config.closable: false,
      customHeader :config.customHeader?config.customHeader :true
    };
    this.dynamicContainer.clear();
    component && this.dynamicContainer.createComponent(component);
    
    const afterClosed = this.closed$.asObservable().pipe(first());
    return { afterClosed };
  }

  getData<T>(): T {
    return this.config.data || null;
  }

  close(data?: any) {
    this.toggle = false;
    this.config.data = null;
    this.closed$.next(data);
  }
}
