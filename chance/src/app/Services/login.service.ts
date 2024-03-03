import { Injectable } from "@angular/core";
import { BlankService } from "./blank.service";

@Injectable()
export class LoginService {
    public isLogin: boolean = false;

    constructor( public blankService: BlankService) {}

    setLogin() {
        this.isLogin = !this.isLogin
        if(this.isLogin === true) {
            this.blankService.enableBlank()
        }
    }

    disableLogin() {
        this.isLogin = false
        this.blankService.disableBlank()
    }

    enableLogin() {
        this.isLogin = true
        this.blankService.enableBlank()
    }

    get LoginState() {
        return this.isLogin;
    }
}