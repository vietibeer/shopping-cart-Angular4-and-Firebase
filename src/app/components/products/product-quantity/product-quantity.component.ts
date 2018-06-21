import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../interface/product';
import { ShoppingCartService } from '../../../service/shopping-cart.service';
import { ShoppingCart } from '../../../interface/shopping-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input() product: Product
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

  getQuantity() { 
    if (!this.shoppingCart || this.shoppingCart.items === undefined) return;  

    let item = this.shoppingCart.items[this.product.$key]
    if (item) {
      this.quantity = item.quantity
    } else {
      this.quantity = 0
    }
  }

  /**
   * Use this function, it must be binding by getQuantity()
   */
  // getQuantity() {   
  //   if(!this.shoppingCart) return 0;      

  //   let item = this.shoppingCart.items[this.product.$key]     
  //   return (item) ? item.quantity : 0
  // } 

  addToCart() {
    this.sCartService.addToCart(this.product)
  }

  removeFromCart() {
    this.sCartService.removeFromCart(this.product)
  }
}
