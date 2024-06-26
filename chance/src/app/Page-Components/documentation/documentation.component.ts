import { Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentationService } from "src/app/Services/documentation.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { GetPostInfoService } from "src/app/Services/getPost-Info.service";
import { LoadingService } from "src/app/Services/loading.service";
import { LoginService } from "src/app/Services/login.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { PostsActionService } from "src/app/Services/posts-actions.service";
import { ProfilesService } from "src/app/Services/profiles.service";
import { SessionService } from "src/app/Services/session.service";
import { SettingsService } from "src/app/Services/settings.service";
import { ViewProfileService } from "src/app/Services/view-profile.service";
import { GlobalVars } from "src/app/utils/global";
import { ParticlesConfig } from "src/app/utils/particles";
import { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";




@Component({
    selector: 'app-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss'],
})

export class DocumentationComponent implements OnInit {


    constructor(public title : Title, public navBarService : NavBarService, public docService : DocumentationService, public settingsService : SettingsService, public particlesConfig: ParticlesConfig,
        public loginService : LoginService, public sessionService : SessionService, public errorSuccessService : ErrorSuccessService) {
    }


    setCurrent(name : string) {
       this.docService.setCurrent(name)
    }

    ngOnInit(): void {

        this.title.setTitle('Chance - Documentation')

        this.docService.expand = true;
        window.scroll(0,0)
    }

    createAccount() {
        if(this.sessionService.session) {
            this.errorSuccessService.setError('You are already logged in');  
            this.errorSuccessService.enableErrorTime(1800);
        } else {
            this.loginService.enableLogin()
        }
    }


    ngAfterContentChecked(): void {
        var x = window.matchMedia("(max-width: 1276px)")

        if(x.matches) {
            this.docService.mobileExpand = true
        } else {
            this.docService.mobileExpand = false
        }
        
    }


    particlesLoaded(container: Container): void {
    }

    async particlesInit(engine: Engine): Promise<void> {

        await loadSlim(engine);
    }






}