import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../interface/app-user';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/of'

@Injectable()
export class AuthService {
  // user$: Observable<firebase.User>
  user$: Observable<firebase.UserInfo>

  constructor(
    private angularFireAuth: AngularFireAuth,
    private activeRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = angularFireAuth.authState
  }

  login() {
    let returnUrl = this.activeRoute.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  logOut() {
    this.angularFireAuth.auth.signOut()
  }

  appUser(): Observable<AppUser> {
    return this.user$.switchMap(user => {
      if (user) return this.userService.get(user.uid);

      return Observable.of(null)
    })
  }
}




























