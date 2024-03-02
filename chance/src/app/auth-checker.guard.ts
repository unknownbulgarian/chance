import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from './Services/session.service';
import { LoginService } from './Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckerGuard implements CanActivate {

  constructor(public loginService: LoginService, private sessionService: SessionService, private router: Router) { }



  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    await this.sessionService.checkIfLogged()

    const isLoggedIn = this.sessionService.session;


    if (!isLoggedIn) {
      this.router.navigate(['/account']);

      return false;
    }

    if (state.url !== '/profile') {
      this.router.navigate(['/profile']);
    }

    return true;
  }
}
