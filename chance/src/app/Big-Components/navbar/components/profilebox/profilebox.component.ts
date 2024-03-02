import { Component, NgModule, OnInit } from "@angular/core";
import { NavBarService } from "src/app/Services/navbar.service";


@Component({
    selector: 'app-profile-box',
    templateUrl: './profilebox.component.html',
    styleUrls: ['./profilebox.component.scss'],
})

export class ProfileBoxComponent{

    constructor(public navBarService: NavBarService) { }

   

}