import { CheckOutComponent } from './check-out.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartSummaryModule } from '../shopping-cart-summary/shopping-cart-summary.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingCartSummaryModule
  ],
  declarations: [CheckOutComponent],
  exports: [CheckOutComponent]
})
export class CheckOutModule { }
