import { Component, OnInit } from "@angular/core";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { SettingsService } from "src/app/Services/settings.service";
import { SupportChatService } from "src/app/Services/support-chat.service";
import { GlobalVars } from "src/app/utils/global";



@Component({
    selector: 'app-support-chat',
    templateUrl: './support-chat.component.html',
    styleUrls: ['./support-chat.component.scss'],
})

export class SupportChatComponent implements OnInit {


    constructor(public supportChatService : SupportChatService, public userInfoService : UserInfoService,
        public globalVars : GlobalVars, public settingsService : SettingsService) {
    }


    ngOnInit(): void {
        this.supportChatService.getMessages()
    }





}