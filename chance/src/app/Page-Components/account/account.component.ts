import { Component, NgModule } from "@angular/core";
import { LoginService } from "../../Services/login.service";


@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})

export class AccountComponent {

   constructor(public loginService: LoginService) {}

   

}