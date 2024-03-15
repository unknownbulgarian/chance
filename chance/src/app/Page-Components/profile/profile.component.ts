import { Component, NgModule, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { LoadingService } from "src/app/Services/loading.service";
import { EditProfileService } from "src/app/Services/edit-profile.service";
import { BlankService } from "src/app/Services/blank.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { ProfileUserInfoService } from "src/app/Services/profile-userinfo.service";
import { ViewProfileService } from "src/app/Services/view-profile.service";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {

    constructor(public userInfoService: UserInfoService, public loadingService: LoadingService, public loaderService: LoadingService,
        public editProfileService: EditProfileService, public blankService: BlankService, public navBarService: NavBarService,
        public profileUserInfoService: ProfileUserInfoService) { }

    ngOnInit(): void {
        window.scroll(0,0)
      this.editProfileService.disableEdit()
    }

 
}