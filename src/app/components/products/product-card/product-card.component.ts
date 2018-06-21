import { ShoppingCartService } from './../../../service/shopping-cart.service';
import { Product } from './../../../interface/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../../interface/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product
  @Input() showAction: boolean = true
  @Input() shoppingCart: ShoppingCart;

  quantity: number
  constructor(
    private sCartService: ShoppingCartService,
  ) {
    this.sCartService.cartState.subscribe(res => {
      this.shoppingCart = res
      this.getQuantity()
    })
  }

  ngOnInit() {
    this.getQuantity()
  }

  addToCart() {
    this.sCartService.addToCart(this.product)
  }

  getQuantity() { 
    this.quantity = 0
    if (!this.shoppingCart || this.shoppingCart.items === undefined) return; 

    let item = this.shoppingCart.items[this.product.$key]
    if (item) {
      this.quantity = item.quantity
    } else {
      this.quantity = 0
    }
  } 

}
