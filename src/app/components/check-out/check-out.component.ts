import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { ShoppingCart } from '../../interface/shopping-cart';
import { ISubscription } from 'rxjs/Subscription';
import { OrderService } from '../../service/order.service';
import 'rxjs/add/operator/map'
import { AuthService } from '../../service/auth.service';
import { Order } from '../../interface/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  formPlaceOrder: FormGroup
  cart: ShoppingCart
  userId: string
  dataCartSub: ISubscription
  dataUserSub: ISubscription
  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.getCart()
  }

  ngOnInit() {
    this.initForm()
    this.getUser()
  }

  initForm() {
    this.formPlaceOrder = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required])
    })
  }

  async placeOrder() {
    if (!this.formPlaceOrder.valid) {
      return;
    }

    let order = new Order(this.userId, this.formPlaceOrder.value, this.cart)
    console.log(order);
    // let undoObjectShoppingCart = order.shoppingCart
    delete order.shoppingCart
    let result = await this.orderService.store(order)
    this.router.navigate(['/order-success', result.key])
  }

  getCart() {
    this.shoppingCartService.getCart().then(data => {
      data.subscribe(res => {
        let items = new ShoppingCart(res.items)
        this.cart = items
        console.log(this.cart);
      }, err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);

    })

  }

  getUser() {
    this.dataUserSub = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy() {
    // this.dataCartSub.unsubscribe()
    // this.dataUserSub.unsubscribe()
  }
}
