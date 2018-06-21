import { MyOrdersComponent } from './my-orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MyOrdersComponent], 
  exports: [MyOrdersComponent]
})
export class MyOrdersModule { }
