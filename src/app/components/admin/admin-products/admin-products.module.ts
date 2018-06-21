import { AdminProductsComponent } from './admin-products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [AdminProductsComponent],
  exports: [AdminProductsComponent]
})
export class AdminProductsModule { }
