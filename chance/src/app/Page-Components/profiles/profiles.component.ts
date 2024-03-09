import { Component, NgModule, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingService } from "src/app/Services/loading.service";
import { SessionService } from "src/app/Services/session.service";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { BlankService } from "src/app/Services/blank.service";
import { ProfileUserInfoService } from "src/app/Services/profile-userinfo.service";



@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss'],
})

export class ProfilesComponent implements OnInit {

    constructor(private route: ActivatedRoute, public loaderService: LoadingService, private sessionService: SessionService, public userInfoService: UserInfoService,
        private router: Router, public profileUserInfoService : ProfileUserInfoService, public blankService: BlankService) { }

    ngOnInit(): void {
        this.loaderService.loaded$.subscribe(loadedValue => {
            if (loadedValue !== 0 && this.userInfoService.userData) {
                if (this.sessionService.session === true) {
                    if (this.route.snapshot.paramMap.get('name') === this.userInfoService.userData.prqkor) {
                        this.router.navigate(['/profile']);
                    }
                }
            }
        });

        this.userInfoService.getPublicUserData(this.route.snapshot.paramMap.get('name'))
    }

}