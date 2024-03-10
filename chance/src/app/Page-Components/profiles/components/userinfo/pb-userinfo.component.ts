import { Component, Input, NgModule, OnInit } from "@angular/core";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { LoadingService } from "src/app/Services/loading.service";
import { EditProfileService } from "src/app/Services/edit-profile.service";
import { BlankService } from "src/app/Services/blank.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { ProfileUserInfoService } from "src/app/Services/profile-userinfo.service";
import { ViewProfileService } from "src/app/Services/view-profile.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector: 'app-pb-info-profile',
    templateUrl: './pb-userinfo.component.html',
    styleUrls: ['./pb-userinfo.component.scss'],
})

export class ProfilePbInfoComponent implements OnInit {

    constructor(public route: ActivatedRoute, public userInfoService: UserInfoService, public loadingService: LoadingService, public loaderService: LoadingService,
        public editProfileService: EditProfileService, public blankService: BlankService, public navBarService: NavBarService,
        public profileUserInfoService: ProfileUserInfoService, public router: Router, public viewProfileService: ViewProfileService) { }

    @Input() publicInfo: string = ''

    ngOnInit(): void {

    }


}