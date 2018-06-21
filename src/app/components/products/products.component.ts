import { ShoppingCartService } from './../../service/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../interface/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ISubscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { ShoppingCart } from '../../interface/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  cart: any
  getCartSub: ISubscription
  dataProducts: Product[] = []
  currentDataProducts: Product[] = []
  category: string

  constructor(
    private productService: ProductService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {
    this.activateRoute.queryParams.subscribe(params => {
      this.category = params.category
      this.filteredProduct()
    })

    this.shoppingCartService.cartState.subscribe(res => {
      this.cart = res
    })
  }

  ngOnInit() {
    // this.resetParams()
    this.getProducts()
    this.getCart()
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.dataProducts = []
      this.dataProducts = res
      this.currentDataProducts = this.dataProducts.slice()
      this.filteredProduct()
    })
  }

  getCart() {
    this.shoppingCartService.getCart().then(data => {
      this.getCartSub = data.subscribe(res => {
        if (typeof (res.items) === 'undefined') return;

        this.shoppingCartService.cartSubject.next(res)
        console.log(res);
      })
    })
  }

  filteredProduct() {
    if (!this.category) {
      this.dataProducts = this.currentDataProducts.slice()
    } else {
      this.dataProducts = this.currentDataProducts.filter(p => {
        return (p.category == this.category)
      })
    }
  }

  // resetParams() {
  //   let param = this.activateRoute.snapshot.queryParamMap.get('category')
  //   if (param) {
  //     this.router.navigate(['/products'])   
  //   }
  // }


  ngOnDestroy() {
    this.getCartSub.unsubscribe()
  }
}
