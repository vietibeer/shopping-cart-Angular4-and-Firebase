import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { ProductQuantityModule } from '../product-quantity/product-quantity.module';

@NgModule({
  imports: [
    CommonModule,
    ProductQuantityModule
  ],
  declarations: [ProductCardComponent],
  exports: [ProductCardComponent],
})
export class ProductCardModule { }
