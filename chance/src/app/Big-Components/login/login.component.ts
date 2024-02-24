import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

    constructor(public loginService: LoginService) { }

    imgSrc: string = 'https://wallpapercave.com/uwp/uwp4279436.png'
    isRegister: boolean = false;


}