import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(
    private angularFireDatabase: AngularFireDatabase
  ) { }

  create(product) {
    return this.angularFireDatabase.list('/products').push(product)
  }

  getAllProducts() { 
    return this.angularFireDatabase.list('/products')
  }

  getProduct(productId) {
    return this.angularFireDatabase.object('/products/' + productId)
  }

  updateProduct(productId, product) {
    return this.angularFireDatabase.object('/products/' + productId).update(product)
  }

  deleteProduct(productId) {
    return this.angularFireDatabase.object('/products/' + productId).remove()
  }
}
