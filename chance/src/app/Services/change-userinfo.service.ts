import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { ErrorSuccessService } from "./error-success.service";
import { UserInfoService } from "./get-userinfo.service";
import { LoadingService } from "./loading.service";
import { EditProfileService } from "./edit-profile.service";

interface newUserInfo {
    isNewImage: any;
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
            isNewImage: '',
            isNewUsername: '',
            isNewName: '',
            isNewBio: ''
        }
    }




    changeUserInfo() {
        this.errorSuccessService.reset();
        this.errorSuccessService.resetSuccess();
        const apiUrl = this.globalVars.apiUrl + '/userChangeInfo';
    
        const formData = new FormData();
        if (this.user.isNewImage) {
            formData.append('isNewImage', this.user.isNewImage);
        }
        formData.append('isNewUsername', this.user.isNewUsername);
        formData.append('isNewName', this.user.isNewName);
        formData.append('isNewBio', this.user.isNewBio);
        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            body: formData,
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
                    this.loaderService.mimic(0,1600)
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