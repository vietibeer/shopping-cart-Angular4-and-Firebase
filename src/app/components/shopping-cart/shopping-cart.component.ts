import { ISubscription } from 'rxjs/Subscription'
import { Product } from './../../interface/product'
import { ShoppingCartService } from './../../service/shopping-cart.service'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { ShoppingCart } from '../../interface/shopping-cart'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  dataCart: any[] = []
  dataCartSub: ISubscription
  dataShoppingCart: ShoppingCart
  cartTotalPrice: number = 0
  shoppingCartItemsCount: number
  constructor(
    private shoppingCartService: ShoppingCartService
  ) {
    this.shoppingCartService.cartState.subscribe(res => {
      this.processObjectResData(res)
    })
  }

  ngOnInit() {
    this.getCart()
  }

  getCart() {
    this.shoppingCartService.getCart().then(data => {
      this.dataCartSub = data.subscribe(res => {
        this.dataShoppingCart = res
        this.processObjectResData(res)

        //track data
        if (res.items === null || res.items === undefined) {
          console.log('undefined');
        }
        this.shoppingCartService.cartSubject.next(res)

      })
    })
  }

  processObjectResData(res: ShoppingCart) {
    let dataCart = new ShoppingCart(res.items)
    this.dataCart = []
    this.cartTotalPrice = 0
    for (let key in dataCart.items) {
      let product = dataCart.items[key].product
      let quantity = dataCart.items[key].quantity
      let totalPrice = dataCart.getTotalPrice(product.price, quantity)
      product.$key = key

      this.processObjectCartItem(product, quantity, totalPrice)
    }

    this.shoppingCartItemsCount = dataCart.getTotalItemsCount()
  }

  processObjectCartItem(product: Product, quantity, totalPrice) {
    this.dataCart.push({
      product: product,
      quantity: quantity,
      totalPrice: totalPrice
    })
    this.cartTotalPrice += totalPrice

  }

  clearShoppingCart() {
    this.shoppingCartService.clearCart()
  }

  ngOnDestroy() {
    this.dataCartSub.unsubscribe()
  }

}
