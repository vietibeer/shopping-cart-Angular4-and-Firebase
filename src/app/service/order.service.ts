import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(
    private angularFireDatebase: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) { }

  async store(order) {
    let result = await this.angularFireDatebase.list('/orders').push(order)
    this.shoppingCartService.clearCart()
    return result
  }
}
