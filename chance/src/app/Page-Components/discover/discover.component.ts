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


interface Categories {
  title: string;
}

interface ProfileCategories {
  title: string;
}


@Component({
  selector: 'app-profiles',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})

export class DiscoverComponent implements OnInit {

  categories: Categories[] = [
    { title: '' },
  ];

  profileCategories: ProfileCategories[] = [
    { title: '' },
  ];

  loadingData: boolean = false;


  constructor(public navBarService: NavBarService, public viewProfileService: ViewProfileService, public router: Router, public particlesConfig: ParticlesConfig, public loaderService: LoadingService, public globalVars: GlobalVars, public discoverService: DiscoverService) { }


  ngOnInit(): void {

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
    this.categories = []
    this.profileCategories = []
    const titlesToAdd: string[] = ['All', 'Cars', 'Games', 'Cartoons'
      , 'Space', 'Sports', 'Movies', 'Nature', 'Celebrities', 'Holidays', 'AI',
      'Superheroes', 'Other'];
    this.categories.push(...titlesToAdd.map(title => ({ title: title })));

    const titlesToAddProfile: string[] = ['All', 'Recent', 'Popular', 'Posts', 'Downloads', 'Views', 'Following', 'Followers', 'Likes', 'Favorites', 'Comments'];
    this.profileCategories.push(...titlesToAddProfile.map(title => ({ title: title })));



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