import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './admin-orders.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminOrdersComponent],
  exports: [
    AdminOrdersComponent
  ]
})
export class AdminOrdersModule { }
