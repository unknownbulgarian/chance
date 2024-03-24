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
import { Meta, Title } from "@angular/platform-browser";



@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})

export class ProfilesComponent implements OnInit {

  username = this.route.snapshot.paramMap.get('name')

  constructor(public particlesConfig: ParticlesConfig, public loginService: LoginService, public globalVars: GlobalVars, public getPostsService: GetPostsService, public route: ActivatedRoute, public loaderService: LoadingService, public sessionService: SessionService, public userInfoService: UserInfoService,
    public router: Router, public profileUserInfoService: ProfileUserInfoService, public blankService: BlankService, public editProfileService: EditProfileService,
    public profilesService: ProfilesService, private meta: Meta, private title: Title) { }


  ngOnInit(): void {
    this.getPostsService.posts = []

    this.title.setTitle(String(this.username))


    window.scroll(0, 0)

    this.route.params.subscribe(params => {
      this.username = params['name'];

      this.loaderService.loaded$.subscribe(loadedValue => {
        if (loadedValue !== 0 && this.userInfoService.userData) {
          this.getPostsService.getPosts(this.username)
          if (this.sessionService.session === true) {
            if (this.username === this.userInfoService.userData.prqkor) {
              this.router.navigate(['/profile']);


            }
          }
        }
      });

      this.userInfoService.getPublicUserData(this.username);
      this.profilesService.checkIfFollow(this.username);


    });
  }

  ngAfterContentChecked(): void {
    this.username = this.route.snapshot.paramMap.get('name')
  }

  ngAfterViewChecked(): void {
    this.meta.addTag({ property: 'og:url', content: 'https://chance-now.vercel.app/profiles/Charon' });
    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ property: 'og:title', content: 'Chance' });
    this.meta.addTag({ property: 'og:description', content: '' }); // Add your description here
    this.meta.addTag({ property: 'og:image', content: '' }); // Add URL of your image here

    // Add Twitter meta tags
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ property: 'twitter:domain', content: 'chance-now.vercel.app' });
    this.meta.addTag({ name: 'twitter:url', content: 'https://chance-now.vercel.app/profiles/Charon' });
    this.meta.addTag({ name: 'twitter:title', content: 'Chance' });
    this.meta.addTag({ name: 'twitter:description', content: '' }); // Add your description here
    this.meta.addTag({ name: 'twitter:image', content: '' });
    
  }


  particlesLoaded(container: Container): void {
  }

  async particlesInit(engine: Engine): Promise<void> {

    await loadSlim(engine);
  }

}