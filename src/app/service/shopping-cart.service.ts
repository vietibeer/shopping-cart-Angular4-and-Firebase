import { ShoppingCart } from './../interface/shopping-cart';
import { Product } from './../interface/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  /**
   * To detect data changes, use this Subject
   */
  cartSubject = new Subject<ShoppingCart>()
  cartState = this.cartSubject.asObservable()

  constructor(
    private angularFireDatabase: AngularFireDatabase
  ) { }

  create() {
    return this.angularFireDatabase.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  getItem(cartId: string, productId: string) {
    return this.angularFireDatabase.object(`/shopping-carts/${cartId}/items/${productId}`)
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cardId = await this.getOrCreateCartId()
    return this.angularFireDatabase.object('/shopping-carts/' + cardId)
    // .map(res => new ShoppingCart(res.items))
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cardId')
    if (cartId) return cartId

    let result = await this.create()
    localStorage.setItem('cardId', result.key)
    return result.key
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1)
  }

  async clearCart() {
    let cardId = await this.getOrCreateCartId()
    this.angularFireDatabase.object(`/shopping-carts/${cardId}/items`).remove()
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId()
    let item$ = this.getItem(cartId, product.$key) // return this.angularFireDatabase.object(`/shopping-carts/${cartId}/items/${productId}`)
    item$.take(1).subscribe(item => {
      let undo = product.$key
      if(product.$key) delete product.$key;
      
      item$.update({
        product: product,
        quantity: (item.quantity || 0) + change
      }) 
      product.$key = undo
    })

    // If quantity equal than 0 then remove
    this.removeItem$(item$)
  }

  private removeItem$(item$: FirebaseObjectObservable<any>) {
    item$.take(1).subscribe(res => {
      if (res.quantity == 0) {
        item$.remove()
      }
    })
  }

}
