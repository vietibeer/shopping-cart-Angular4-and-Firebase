import { ShoppingCartComponent } from './shopping-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductQuantityModule } from '../products/product-quantity/product-quantity.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ProductQuantityModule,
    RouterModule
  ],
  declarations: [ShoppingCartComponent],
  exports: [ShoppingCartComponent]
})
export class ShoppingCartModule { }
