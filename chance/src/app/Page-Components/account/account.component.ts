import { Component, NgModule } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { CreateAccountService } from "src/app/Services/create-account.service";
import { FormsModule } from "@angular/forms";


@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    providers: [CreateAccountService]
})

export class AccountComponent {

    constructor(public loginService: LoginService, public createAccountService: CreateAccountService) {
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