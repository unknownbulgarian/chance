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



@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss'],
})

export class ProfilesComponent implements OnInit {

    username = this.route.snapshot.paramMap.get('name')

    constructor(public route: ActivatedRoute, public loaderService: LoadingService, private sessionService: SessionService, public userInfoService: UserInfoService,
        private router: Router, public profileUserInfoService : ProfileUserInfoService, public blankService: BlankService, public editProfileService: EditProfileService,
        public profilesService: ProfilesService) { }

        ngOnInit(): void {

         window.scroll(0,0)

            this.route.params.subscribe(params => {
              this.username = params['name'];
        
              this.loaderService.loaded$.subscribe(loadedValue => {
                if (loadedValue !== 0 && this.userInfoService.userData) {
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

}