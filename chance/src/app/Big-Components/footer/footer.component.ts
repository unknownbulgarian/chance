import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "src/app/Services/chat.service";
import { LoginService } from "src/app/Services/login.service";
import { SessionService } from "src/app/Services/session.service";
import { SettingsService } from "src/app/Services/settings.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})

export class FooterComponent{

    constructor(public settingsService : SettingsService, public router : Router,public loginService : LoginService, public sessionService: SessionService, public chatService : ChatService) { }



    scrollTo(x : number, y : number) {
        window.scroll(x,y)
    }

    locateTo(url: string) {
      window.open(url, '_blank')
    }


}