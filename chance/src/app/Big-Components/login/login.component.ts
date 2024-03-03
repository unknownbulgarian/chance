import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { LoginAccountService } from "src/app/Services/login-account.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { BlankService } from "src/app/Services/blank.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginAccountService]
})

export class LoginComponent {

    constructor(public loginService: LoginService, public loginAccountService: LoginAccountService, public errorSuccessService: ErrorSuccessService,
        public blankService: BlankService) { }

    imgSrc: string = 'https://wallpapercave.com/uwp/uwp4279436.png'
    isRegister: boolean = false;


    valueFromChild(value: string, isValue: string) {
        console.log(value)
        switch (isValue) {
            case 'email':
                this.loginAccountService.user.email = value
                break;
            case 'password':
                this.loginAccountService.user.password = value
                break;
        }
    }

}