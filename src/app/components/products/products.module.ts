import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ProductCardModule } from './product-card/product-card.module';
import { ProductFilterModule } from './product-filter/product-filter.module'; 
import { ProductQuantityModule } from './product-quantity/product-quantity.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProductCardModule,
    ProductFilterModule,
    ProductQuantityModule
  ],
  declarations: [ProductsComponent],
  exports: [ProductsComponent]
})
export class ProductsModule { }
