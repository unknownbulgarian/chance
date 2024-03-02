import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {
    public isLogin: boolean = false;

    setLogin() {
        this.isLogin = !this.isLogin;
    }

    disableLogin() {
        this.isLogin = false;
    }

    enableLogin() {
        this.isLogin = true;
    }

    get LoginState() {
        return this.isLogin;
    }
}