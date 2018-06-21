import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from "ng2-validation"; 
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Module
import { HomeModule } from './components/home/home.module';
import { ProductsModule } from './components/products/products.module';
import { CheckOutModule } from './components/check-out/check-out.module';
import { LoginModule } from './components/login/login.module';
import { AdminProductsModule } from './components/admin/admin-products/admin-products.module';
import { AdminOrdersModule } from './components/admin/admin-orders/admin-orders.module';
import { ShoppingCartModule } from './components/shopping-cart/shopping-cart.module';
import { OrderSuccessModule } from './components/order-success/order-success.module';
import { MyOrdersModule } from './components/my-orders/my-orders.module';
import { ProductFormModule } from './components/admin/product-form/product-form.module';
import { ProductFilterModule } from './components/products/product-filter/product-filter.module';
import { ProductCardModule } from './components/products/product-card/product-card.module'; 
import { ProductQuantityModule } from './components/products/product-quantity/product-quantity.module';
import { ShippingFormModule } from './components/shipping-form/shipping-form.module';
import { ShoppingCartSummaryModule } from './components/shopping-cart-summary/shopping-cart-summary.module';
 
//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

//Routing
import { AppRoutingModule } from './app.routing';

//Service
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard.service';
import { UserService } from './service/user.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { CategoryService } from './service/category.service';
import { ProductService } from './service/product.service'; 
import { ShoppingCartService } from './service/shopping-cart.service'; 
import { OrderService } from './service/order.service'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HomeModule,
    ProductsModule,
    ProductCardModule,
    ProductFilterModule,
    ProductQuantityModule,
    CheckOutModule,
    LoginModule,
    OrderSuccessModule,
    ShoppingCartModule,
    ShoppingCartSummaryModule,
    ShippingFormModule,
    AdminOrdersModule,
    AdminProductsModule,
    MyOrdersModule,
    ProductFormModule,
    CustomFormsModule, 
    NgxDatatableModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
