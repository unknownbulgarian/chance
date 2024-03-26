import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { BlankService } from 'src/app/Services/blank.service';
import { UserInfoService } from 'src/app/Services/get-userinfo.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { ProfileUserInfoService } from 'src/app/Services/profile-userinfo.service';
import { SettingsService } from 'src/app/Services/settings.service';
import { ViewProfileService } from 'src/app/Services/view-profile.service';
import { GlobalVars } from 'src/app/utils/global';

@Component({
    selector: 'app-user-profile-info',
    templateUrl: './userinfo.component.html',
    styleUrls: ['./userinfo.component.scss'],
})
export class ProfileUserInfoComponent {
    constructor(public settingsService : SettingsService, public renderer: Renderer2, public element: ElementRef, public blankService: BlankService, public profileUserInfoService: ProfileUserInfoService, public loaderService: LoadingService, public userInfoService : UserInfoService,
        public router: Router, public viewProfileService: ViewProfileService, public globalVars :GlobalVars) { }

    @Input() info: string = ''





}
