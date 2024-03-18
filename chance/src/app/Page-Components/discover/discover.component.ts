import { Component, NgModule, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingService } from "src/app/Services/loading.service";
import { SessionService } from "src/app/Services/session.service";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { BlankService } from "src/app/Services/blank.service";
import { ProfileUserInfoService } from "src/app/Services/profile-userinfo.service";
import { EditProfileService } from "src/app/Services/edit-profile.service";
import { ProfilesService } from "src/app/Services/profiles.service";
import { GetPostsService } from "src/app/Services/getPosts.service";
import { GlobalVars } from "src/app/utils/global";
import { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { ParticlesConfig } from "src/app/utils/particles";
import { DiscoverService } from "src/app/Services/discover.service";



@Component({
  selector: 'app-profiles',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})

export class DiscoverComponent implements OnInit{



  constructor(public globalVars: GlobalVars, public discoverService : DiscoverService) { }


  ngOnInit(): void {
     this.discoverService.getAllPosts()
  }


  
  particlesLoaded(container: Container): void {
   
  }

  async particlesInit(engine: Engine): Promise<void> {


    await loadSlim(engine);
  }

}