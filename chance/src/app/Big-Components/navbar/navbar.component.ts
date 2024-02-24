import { Component, NgModule } from "@angular/core";
import { LoginService } from "../../Services/login.service";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavComponent {

    constructor(public loginService: LoginService) {}

}