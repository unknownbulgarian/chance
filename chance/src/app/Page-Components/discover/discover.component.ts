import { Component, HostListener, NgModule, OnInit } from "@angular/core";
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
import { ViewProfileService } from "src/app/Services/view-profile.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { SettingsService } from "src/app/Services/settings.service";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-profiles',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})

export class DiscoverComponent implements OnInit {


  loadingData: boolean = false;


  constructor(public title : Title, public settingsService : SettingsService, public navBarService: NavBarService, public viewProfileService: ViewProfileService, public router: Router, public particlesConfig: ParticlesConfig, public loaderService: LoadingService, public globalVars: GlobalVars, public discoverService: DiscoverService) { }


  ngOnInit(): void {

    this.title.setTitle('Chance - Discover art')


    this.discoverService.allPosts = []
    this.discoverService.categoriePosts = []

    this.discoverService.mostFavoritesProfiles = []
    this.discoverService.mostFollowersProfiles = []
    this.discoverService.recentProfiles = []
    this.discoverService.allProfiles = []
    this.discoverService.popularProfiles = []
    this.discoverService.mostFollowersProfiles = []
    this.discoverService.mostPostsProfiles = []
    this.discoverService.mostLikesProfiles = []
    this.discoverService.mostCommentsProfiles = []

    if (!this.navBarService.isSearch) {
      this.discoverService.getAllPosts()
    }

    if (!this.navBarService.isAccountSearch) {
      this.discoverService.getAllProfiles()
    }



    this.discoverService.theCategorie = 'All'
    this.discoverService.theProfileCategorie = 'All'

    if (this.discoverService.theCategorie !== '') {
      if (!this.navBarService.isSearch) {
        this.discoverService.getCategoriePosts(this.discoverService.theCategorie)
      }
    }

  }

  ngOnDestroy(): void {
    this.discoverService.theCategorie = 'All'
    this.discoverService.setDefaultPage()
  }




  particlesLoaded(container: Container): void {

  }

  async particlesInit(engine: Engine): Promise<void> {


    await loadSlim(engine);
  }

}