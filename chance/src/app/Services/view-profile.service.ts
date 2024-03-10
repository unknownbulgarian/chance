import { Injectable } from "@angular/core";
import { BlankService } from "./blank.service";
import { EditProfileService } from "./edit-profile.service";
import { LoadingService } from "./loading.service";
import { UserInfoService } from "./get-userinfo.service";
import { ProfileUserInfoService } from "./profile-userinfo.service";


@Injectable()
export class ViewProfileService {

    constructor(private blankService: BlankService, private editProfileService: EditProfileService, private loaderService: LoadingService, 
        private profileUserInfoService: ProfileUserInfoService) { }

    view() {
        this.loaderService.mimicMini(4,1000)
        this.blankService.disableBlank()
        this.editProfileService.disableEdit()
        this.profileUserInfoService.setDisable()
    }
}