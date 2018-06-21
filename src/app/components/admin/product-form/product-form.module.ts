import { ProductCardModule } from './../../products/product-card/product-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductCardModule
  ],
  declarations: [ProductFormComponent]
})
export class ProductFormModule { }
