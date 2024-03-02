// create-account.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from '../Services/session.service';

@Injectable({
    providedIn: 'root'
})
export class CreateAccountGuard implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            await this.sessionService.checkIfLogged();

            const isLoggedIn = this.sessionService.session;

            if (isLoggedIn) {
                this.router.navigate(['/profile']);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error checking if logged:', error);
            return false;
        }
    }
}
