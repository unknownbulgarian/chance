import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { ErrorSuccessService } from "./error-success.service";
import { UserInfoService } from "./get-userinfo.service";
import { LoadingService } from "./loading.service";
import { EditProfileService } from "./edit-profile.service";

interface newUserInfo {
    isNewUsername: string;
    isNewName: string;
    isNewBio: string;
}


@Injectable()
export class ChangeUserInfoService {

    user: newUserInfo

    constructor(private globalVars: GlobalVars, private errorSuccessService: ErrorSuccessService, private userInfoService: UserInfoService,
        private loaderService: LoadingService, private editProfileService: EditProfileService) {
        this.user = {
            isNewUsername: '',
            isNewName: '',
            isNewBio: ''
        }
    }




    changeUserInfo() {
        this.errorSuccessService.reset();
        this.errorSuccessService.resetSuccess();
        const apiUrl = this.globalVars.apiUrl + '/userChangeInfo';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(this.user),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json();
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    this.errorSuccessService.enableError();
                    this.errorSuccessService.setError(data.error);
                } else {
                    this.errorSuccessService.enableSuccess();
                    this.errorSuccessService.setSuccess(data.message);

                    setTimeout(() => {
                        this.errorSuccessService.disableBoth()
                        this.userInfoService.getUserData()
                        this.loaderService.mimic()
                        this.editProfileService.disableEdit()
                    }, 1600);

                }
            })
            .catch(async error => {
                console.error('Error:', error);
                this.errorSuccessService.setError('Something went wrong');
            });
    }
}