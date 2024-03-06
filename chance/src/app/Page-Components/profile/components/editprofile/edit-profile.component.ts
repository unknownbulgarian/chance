import { Component, OnInit } from '@angular/core';
import { BlankService } from 'src/app/Services/blank.service';
import { ChangeUserInfoService } from 'src/app/Services/change-userinfo.service';
import { EditProfileService } from 'src/app/Services/edit-profile.service';
import { ErrorSuccessService } from 'src/app/Services/error-success.service';
import { UserInfoService } from 'src/app/Services/get-userinfo.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  constructor(public blankService: BlankService, public editProfileService: EditProfileService, public changeUserInfoService: ChangeUserInfoService,
    public errrSuccessService: ErrorSuccessService, public userInfoService: UserInfoService) { }



  takeNewData(value: string, isValue: string) {
    switch (isValue) {
      case 'username':
        this.changeUserInfoService.user.isNewUsername = value;
        break;
      case 'name':
        this.changeUserInfoService.user.isNewName = value;
        break;
      case 'bio':
        this.changeUserInfoService.user.isNewBio = value;
        break;
    }
  }


}
