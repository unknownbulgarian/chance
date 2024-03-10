import { Component, NgModule, OnInit } from "@angular/core";
import { LoopService } from "src/app/Services/loop.service";
import { NavBarService } from "src/app/Services/navbar.service";


@Component({
    selector: 'app-notification-box',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})

export class NotificationBoxComponent{

    constructor(public navBarService: NavBarService, public loopService: LoopService) { }

    isNoti : number = 1;

}