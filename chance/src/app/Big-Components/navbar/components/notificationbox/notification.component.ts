import { Component, NgModule, OnInit } from "@angular/core";
import { NavBarService } from "src/app/Services/navbar.service";


@Component({
    selector: 'app-notification-box',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})

export class NotificationBoxComponent{

    constructor(public navBarService: NavBarService) { }

   

}