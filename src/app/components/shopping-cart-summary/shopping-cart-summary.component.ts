import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ShoppingCart } from '../../interface/shopping-cart';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { ShoppingCartItem } from '../../interface/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit, OnChanges {
  @Input() cart: ShoppingCart
  shoppingCartItemsCount: number
  cartTotalPrice: number
  data: ShoppingCartItem[] = []
  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "cart" changed
    if (changes['cart']) {
      if (changes.cart.currentValue !== undefined && changes.cart.currentValue instanceof (Object)) {
        let item = changes.cart.currentValue.items
        for (let key in item) {
          this.data.push(item[key])
          this.getCartTotal(item[key].product.price, item[key].quantity)
        } 
        this.getItemCount(changes.cart.currentValue)
      }

    }
  }


  getItemCount(cart: ShoppingCart) {
    this.shoppingCartItemsCount = 0
    this.shoppingCartItemsCount = this.cart.getTotalItemsCount()
  }

  getCartTotal(productPrice, quantity) {
    this.cartTotalPrice = 0
    for (let key in this.cart.items) {
      let item = this.cart.items[key]
      this.cartTotalPrice += this.cart.getTotalPrice(item.product.price, item.quantity)
    }
  }

  getTotalPrice(productPrice, quantity) {
    return this.cart.getTotalPrice(productPrice, quantity)
  }

}
