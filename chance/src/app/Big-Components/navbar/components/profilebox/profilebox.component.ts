import { Component, NgModule, OnInit } from "@angular/core";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { Killer } from "src/app/Services/kill-session.service";
import { NavBarService } from "src/app/Services/navbar.service";


@Component({
    selector: 'app-profile-box',
    templateUrl: './profilebox.component.html',
    styleUrls: ['./profilebox.component.scss'],
})

export class ProfileBoxComponent{

    constructor(public navBarService: NavBarService, public killer: Killer, public userInfoService: UserInfoService) { }

   

}