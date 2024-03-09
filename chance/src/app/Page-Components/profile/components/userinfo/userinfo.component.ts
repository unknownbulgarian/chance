import { Component, Input, OnInit } from '@angular/core';
import { BlankService } from 'src/app/Services/blank.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { ProfileUserInfoService } from 'src/app/Services/profile-userinfo.service';

@Component({
    selector: 'app-user-profile-info',
    templateUrl: './userinfo.component.html',
    styleUrls: ['./userinfo.component.scss'],
})
export class ProfileUserInfoComponent {
    constructor(public blankService: BlankService, public profileUserInfoService: ProfileUserInfoService, public loaderService: LoadingService) { }

    @Input() info: string = ''





}
