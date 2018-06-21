import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    authService.user$.subscribe(user => { 
      if (user) {
        userService.save(user)
        let returnUrl = localStorage.getItem('returnUrl') 
        if (!returnUrl) return;

        localStorage.removeItem('returnUrl')
        router.navigateByUrl(returnUrl) 
      }
    })
  }
}
