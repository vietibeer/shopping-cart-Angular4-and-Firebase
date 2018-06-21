import { AuthService } from './auth.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.map(user => { 
      if (user) return true;
      console.log(state);
      console.log(this.router.config);
      
      
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
      return false;
    }) 
  }
}
