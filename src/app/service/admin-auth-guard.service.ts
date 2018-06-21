import { Observable } from 'rxjs/Observable'; 
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map'

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router, 
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.appUser().map(appUser => appUser.isAdmin) 
  }


}
