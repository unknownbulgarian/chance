import { Component, OnInit } from '@angular/core';
import { BlankService } from 'src/app/Services/blank.service';
import { ChangeUserInfoService } from 'src/app/Services/change-userinfo.service';
import { EditProfileService } from 'src/app/Services/edit-profile.service';
import { ErrorSuccessService } from 'src/app/Services/error-success.service';
import { UserInfoService } from 'src/app/Services/get-userinfo.service';
import { SettingsService } from 'src/app/Services/settings.service';
import { GlobalVars } from 'src/app/utils/global';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  constructor(public settingsService : SettingsService, public blankService: BlankService, public editProfileService: EditProfileService, public changeUserInfoService: ChangeUserInfoService,
    public errrSuccessService: ErrorSuccessService, public userInfoService: UserInfoService, public globalVars : GlobalVars) { }




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

  ImageUpload(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.changeUserInfoService.user.isNewImage = file;

      const reader = new FileReader();
      reader.onload = () => {
          this.editProfileService.currentImage= reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  


}
