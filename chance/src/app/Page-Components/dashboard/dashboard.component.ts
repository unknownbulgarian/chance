import { Component, NgModule, OnInit } from "@angular/core";
import { DashboardService } from "src/app/Services/dashboard.service";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { GetPostInfoService } from "src/app/Services/getPost-Info.service";
import { LoadingService } from "src/app/Services/loading.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { GlobalVars } from "src/app/utils/global";
import { ParticlesConfig } from "src/app/utils/particles";
import { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit{

    constructor(public navBarService : NavBarService, public particlesConfig : ParticlesConfig, public dashBoardService : DashboardService, public globalVars : GlobalVars, public userInfoService : UserInfoService, public loaderService: LoadingService, public getPostInfoService : GetPostInfoService) { }

    ngOnInit(): void {
        this.getPostInfoService.posts = []
          this.dashBoardService.getUserInfo()
        this.loaderService.loaded$.subscribe((loaded) => {
            if(loaded !== 0) {
                this.getPostInfoService.getUserPosts(this.userInfoService.userData.id.toString())
                this.dashBoardService.getUserInfo()
            }
        })
    }


    
    particlesLoaded(container: Container): void {
    }

    async particlesInit(engine: Engine): Promise<void> {

        await loadSlim(engine);
    }


}