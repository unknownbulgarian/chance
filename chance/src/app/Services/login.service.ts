import { ChangeDetectorRef } from '@angular/core';


export class LoginService{   
    public isLogin : boolean = true;

    setLogin() {
        this.isLogin = !this.isLogin;
    }
}