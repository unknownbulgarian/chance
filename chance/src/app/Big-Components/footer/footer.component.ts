import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/Services/login.service";
import { SessionService } from "src/app/Services/session.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})

export class FooterComponent{

    constructor( public router : Router,public loginService : LoginService, public sessionService: SessionService) { }



    scrollTo(x : number, y : number) {
        window.scroll(x,y)
    }


}