import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }


  getCategories() {
    return this.angularFireDatabase.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    })
  }
}
