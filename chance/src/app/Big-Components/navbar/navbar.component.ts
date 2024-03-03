import { Component, NgModule, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { SessionService } from "src/app/Services/session.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { BlankService } from "src/app/Services/blank.service";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavComponent{

    constructor(public loginService: LoginService, public errorSuccessService: ErrorSuccessService, public sessionService: SessionService,
    public navBarService: NavBarService) { }

   

}