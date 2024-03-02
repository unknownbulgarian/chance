import { Component, NgModule } from "@angular/core";
import { LoginService } from "../../Services/login.service";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent {

   constructor(public loginService: LoginService) {}

   

}