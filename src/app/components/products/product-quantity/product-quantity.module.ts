import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductQuantityComponent } from './product-quantity.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductQuantityComponent],
  exports: [ProductQuantityComponent],
})
export class ProductQuantityModule { }
