import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { LoginAccountService } from "src/app/Services/login-account.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { BlankService } from "src/app/Services/blank.service";
import { SettingsService } from "src/app/Services/settings.service";
import { LoadingService } from "src/app/Services/loading.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginAccountService]
})

export class LoginComponent{

    constructor(private loaderService : LoadingService, private renderer: Renderer2, private element: ElementRef,public loginService: LoginService, public loginAccountService: LoginAccountService, public errorSuccessService: ErrorSuccessService,
        public blankService: BlankService, public settingsService : SettingsService) { }

    imgSrc: string = 'assets/images/login_back.jpg'
    isRegister: boolean = false;

    valueFromChild(value: string, isValue: string) {
        switch (isValue) {
            case 'email':
                this.loginAccountService.user.email = value
                break;
            case 'password':
                this.loginAccountService.user.password = value
                break;
        }
    }

    fixSignUp() {
        this.loaderService.loadedSubject.next(0)


        setTimeout(() => {
            this.loaderService.loadedSubject.next(100)
        }, 1300);
    } 

}