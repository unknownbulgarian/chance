import { Component, ElementRef, NgModule, OnInit, Renderer2 } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { LoadingService } from "src/app/Services/loading.service";
import { EditProfileService } from "src/app/Services/edit-profile.service";
import { BlankService } from "src/app/Services/blank.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { ProfileUserInfoService } from "src/app/Services/profile-userinfo.service";
import { ViewProfileService } from "src/app/Services/view-profile.service";
import { GetPostsService } from "src/app/Services/getPosts.service";
import { GlobalVars } from "src/app/utils/global";
import { Router } from "@angular/router";
import { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { ParticlesConfig } from "src/app/utils/particles";
import { SettingsService } from "src/app/Services/settings.service";
import { Title } from "@angular/platform-browser";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {

    constructor(public title : Title, public settingsService : SettingsService, public particlesConfig : ParticlesConfig, public router : Router, public globalVars : GlobalVars, public getPostsService: GetPostsService, public userInfoService: UserInfoService, public loadingService: LoadingService, public loaderService: LoadingService,
        public editProfileService: EditProfileService, public blankService: BlankService, public navBarService: NavBarService,
        public profileUserInfoService: ProfileUserInfoService) { }


    ngOnInit(): void {

        this.userInfoService.isProfile = true;
        this.userInfoService.getUserData()

        //this.title.setTitle('Chance - Profile ')

        this.getPostsService.posts = []

        this.loaderService.loaded$.subscribe((loader) => {
            if (loader !== 1) {
                this.getPostsService.getPosts(this.userInfoService.userData.prqkor)
            }
        })
    }

    ngOnDestroy(): void {
        this.userInfoService.isProfile =false;
        
    }

    
    particlesLoaded(container: Container): void {
      }
    
      async particlesInit(engine: Engine): Promise<void> {
    
        await loadSlim(engine);
      }
    

}