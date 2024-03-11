import { Component, NgModule } from "@angular/core";
import { LoginService } from "../../Services/login.service";


@Component({
    selector: 'app-account',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})

export class ChatComponent {

   constructor(public loginService: LoginService) {}

   isFollowing : boolean = false;
   isRequests : boolean = false;
   

}