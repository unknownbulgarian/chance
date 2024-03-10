import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlankService } from 'src/app/Services/blank.service';
import { UserInfoService } from 'src/app/Services/get-userinfo.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { ProfileUserInfoService } from 'src/app/Services/profile-userinfo.service';
import { ViewProfileService } from 'src/app/Services/view-profile.service';

@Component({
    selector: 'app-user-profile-info',
    templateUrl: './userinfo.component.html',
    styleUrls: ['./userinfo.component.scss'],
})
export class ProfileUserInfoComponent {
    constructor(public blankService: BlankService, public profileUserInfoService: ProfileUserInfoService, public loaderService: LoadingService, public userInfoService : UserInfoService,
        public router: Router, public viewProfileService: ViewProfileService) { }

    @Input() info: string = ''





}
