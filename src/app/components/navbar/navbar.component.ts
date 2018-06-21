import { ISubscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../../service/shopping-cart.service';
import { Router } from '@angular/router';
import { AppUser } from './../../interface/app-user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ShoppingCart } from '../../interface/shopping-cart';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // user: firebase.User 
  // user$$: Observable<firebase.User>
  appUser: AppUser
  shoppingCartItemCount: number
  cart: ShoppingCart
  dataCartSub: ISubscription
  constructor(
    public authService: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {
    // angularFireAuth.authState.subscribe(user => this.user = user) 
    this.authService.appUser().subscribe(user => this.appUser = user)
  }

  ngOnInit() {
    this.getCart()
  }

  logout() {
    this.authService.logOut()
    this.router.navigate(['/login'])
  }

  //          Using Async/await
  // async getCart() {
  //   let cardId = await this.shoppingCartService.getCart()
  //   console.log(cardId);
  //   cardId.subscribe(res => {
  //     console.log(res);
  //     let items = res.items
  //     this.shoppingCartItemCount = 0
  //     for (let item in items) {
  //       this.shoppingCartItemCount += items[item].quantity
  //     }
  //   })

  // }

  //          Using Promise.then -> subscribe
  getCart() {
    this.shoppingCartService.getCart().then(data => { 
      this.dataCartSub = data.subscribe(res => {
        this.cart = new ShoppingCart(res.items)
        this.shoppingCartItemCount = this.cart.getTotalItemsCount() 
        // this.shoppingCartItemCount = 0
        // for (let item in res.items) {
        //   this.shoppingCartItemCount += res.items[item].quantity
        // }
      })
    })
  }

  ngOnDestroy() {
    this.dataCartSub.unsubscribe()
  }
 

}
