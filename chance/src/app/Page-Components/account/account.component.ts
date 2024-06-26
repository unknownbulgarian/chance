import { Component, NgModule, OnInit, Renderer2, ElementRef } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { CreateAccountService } from "src/app/Services/create-account.service";
import { FormsModule } from "@angular/forms";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { SessionService } from "src/app/Services/session.service";
import { Router } from "@angular/router";
import { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { ParticlesConfig } from "src/app/utils/particles";
import { LoadingService } from "src/app/Services/loading.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { SettingsService } from "src/app/Services/settings.service";
import { Title } from "@angular/platform-browser";



@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    providers: [CreateAccountService]
})

export class AccountComponent implements OnInit {

    constructor(public title : Title, public navBarService : NavBarService, public loaderService : LoadingService, 
        public particlesConfig: ParticlesConfig,private renderer: Renderer2, 
        private element: ElementRef, public loginService: LoginService, 
        public createAccountService: CreateAccountService, public errorSuccessService: ErrorSuccessService, public settingsService : SettingsService) {
    }

    ngOnInit(): void {

        this.title.setTitle('Chance - First steps to something great')

        window.scroll(0, 0)
        this.loaderService.miniLoadedSubject.next(100)
    }

    ngOnDestroy(): void {
        this.errorSuccessService.disableError()
        this.errorSuccessService.disableSuccess()
    }



    valueFromChild(value: string, isValue: string) {
        switch (isValue) {
            case 'username':
                this.createAccountService.user.username = value
                break;
            case 'email':
                this.createAccountService.user.email = value
                break;
            case 'password':
                this.createAccountService.user.password = value
                break;
            case 'confpassword':
                this.createAccountService.user.confirmPassword = value
                break;
            case 'date':
                this.createAccountService.user.date = value
                break;
        }


    }

    particlesLoaded(container: Container): void {
      }
    
      async particlesInit(engine: Engine): Promise<void> {
    
        await loadSlim(engine);
      }
        

}