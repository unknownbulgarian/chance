import { Component, Renderer2, ElementRef, QueryList, ViewChildren  } from "@angular/core";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { SettingsService } from "src/app/Services/settings.service";


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})

export class SettingsComponent{

    isPage : number = 1
    body = document.body;

    constructor(public settingsService : SettingsService, public userInfoService : UserInfoService, public renderer: Renderer2) { }

}