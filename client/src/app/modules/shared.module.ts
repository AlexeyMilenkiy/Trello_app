import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalErrorComponent } from '@components/modal-error/modal-error.component';

@NgModule({
  declarations: [
    ModalErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ModalErrorComponent
  ]
})
export class SharedModule { }
