import { Component, NgModule, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { CreateAccountService } from "src/app/Services/create-account.service";
import { FormsModule } from "@angular/forms";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { SessionService } from "src/app/Services/session.service";
import { Router } from "@angular/router";


@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    providers: [CreateAccountService]
})

export class AccountComponent implements OnInit {

    constructor(public loginService: LoginService, public createAccountService: CreateAccountService, public errorSuccessService: ErrorSuccessService) {
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.errorSuccessService.disableError()
        this.errorSuccessService.disableSuccess()
    }



    valueFromChild(value: string, isValue: string) {
        switch (isValue) {
            case 'username':
                this.createAccountService.user.username = value
                break;
            case 'email':
                this.createAccountService.user.email = value
                break;
            case 'password':
                this.createAccountService.user.password = value
                break;
            case 'confpassword':
                this.createAccountService.user.confirmPassword = value
                break;
            case 'date':
                this.createAccountService.user.date = value
                break;
        }


    }

}