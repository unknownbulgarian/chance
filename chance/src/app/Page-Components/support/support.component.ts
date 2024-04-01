import { Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild } from "@angular/core";
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


interface boxes {
    title: string
    icons: string
}

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss'],
})

export class SupportComponent implements OnInit {


    titles: string[] = ['Getting Started', 'Account Settings', 'Community', 'Live chat']

    constructor(public settingsService: SettingsService, public particlesConfig: ParticlesConfig, public sessionService: SessionService,
        public loginService: LoginService, public docService: DocumentationService, public router: Router) {
    }

    ngOnInit(): void {
        window.scroll(0, 0)
    }



    navigateTo(url: string) {
        window.open(url, '_blank')
    }

    searchDocs(type: string) {
        this.router.navigate(['/documentation'])
        this.docService.current = type
        switch (type) {
            case 'background':
            case 'firststeps':
                this.docService.isAlgo = true
                break;
            case 'requirements':
                this.docService.isCreator = true
                break;
            case 'uploadapost':
            case 'chatwithstrangers':
                this.docService.isTutorial = true
                break;
            case 'howitworks':
                this.docService.isAPI = true
                break;
            case 'whatischance':
            case 'createaccount':
                this.docService.isStarted = true
                break;
            case '':

                break;
        }
    }



    particlesLoaded(container: Container): void {
    }

    async particlesInit(engine: Engine): Promise<void> {

        await loadSlim(engine);
    }






}