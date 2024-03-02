import { Component, NgModule, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavComponent{

    constructor(public loginService: LoginService, public errorSuccessService: ErrorSuccessService) { }

}