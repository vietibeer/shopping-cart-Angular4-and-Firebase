import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShoppingCartSummaryComponent],
  exports: [ShoppingCartSummaryComponent]
})
export class ShoppingCartSummaryModule { }
