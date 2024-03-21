import { Component, NgModule, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoopService } from "src/app/Services/loop.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { GlobalVars } from "src/app/utils/global";


@Component({
    selector: 'app-notification-box',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})

export class NotificationBoxComponent{

    constructor(public navBarService: NavBarService, public loopService: LoopService, public globalVars : GlobalVars, public router : Router) { }

    isNoti : number = 1;

}