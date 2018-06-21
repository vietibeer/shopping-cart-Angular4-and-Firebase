import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AppUser } from '../interface/app-user';

@Injectable()
export class UserService {

  constructor(
    private firebaseDatabase: AngularFireDatabase
  ) { }

  save(user: firebase.UserInfo) { 
    this.firebaseDatabase.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }) 
  } 

  get(uid: string): FirebaseObjectObservable<AppUser> {
    return this.firebaseDatabase.object('/users/' + uid)
  }

}