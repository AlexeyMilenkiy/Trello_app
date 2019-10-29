import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClickOutsideModule } from 'ng-click-outside';

import { ModalErrorComponent } from '@components/modal-error/modal-error.component';
import { StartHeaderComponent } from '@components/start-header/start-header.component';

import { AutoFocusDirective } from '@app/directives/auto-focus.directive';


@NgModule({
  declarations: [
    ModalErrorComponent,
    StartHeaderComponent,
    AutoFocusDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ClickOutsideModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ModalErrorComponent,
    StartHeaderComponent,
    AutoFocusDirective,
  ]
})
export class SharedModule { }
