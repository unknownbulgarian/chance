import { Component, NgModule, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";

@Component({
    selector: 'app-account',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent {

   constructor(public loginService: LoginService) {}

 
   isFaq : number = 0;
    
   

   

}