import { Component, NgModule, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { SessionService } from "src/app/Services/session.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { BlankService } from "src/app/Services/blank.service";
import { LoopService } from "src/app/Services/loop.service";
import { Router } from "@angular/router";
import * as AOS from 'aos'
import { DiscoverService } from "src/app/Services/discover.service";
import { MobileService } from "src/app/Services/mobile.service";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavComponent{


    constructor(public discoverService: DiscoverService, public router : Router, public loginService: LoginService, public errorSuccessService: ErrorSuccessService, public sessionService: SessionService,
    public navBarService: NavBarService, public loopService : LoopService, public mobileService : MobileService) { }

    currentSearch : string = ''
    searchExpand : boolean = false;

    getSearchValue(search : string) {
        this.currentSearch = search
    }

    checkInputOn(): void {
        this.searchExpand = true;
        this.navBarService.disableAll()
      }

    checkInputOff() {
        setTimeout(() => {
            this.searchExpand = false;
        }, 100);
    }

    preventBlur(event: MouseEvent): void {
        event.stopPropagation();
    }

    scrollTop() {
        window.scroll(0,0)
    }


    locateTo(url: string) {
        window.open(url, '_blank')
      }
  

}