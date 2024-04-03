import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { ErrorSuccessService } from "./error-success.service";
import { UserInfoService } from "./get-userinfo.service";
import { LoadingService } from "./loading.service";
import { EditProfileService } from "./edit-profile.service";
import { SessionService } from "./session.service";

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
        private loaderService: LoadingService, private editProfileService: EditProfileService, private sessionService : SessionService) {
        this.user = {
            isNewImage: '',
            isNewUsername: '',
            isNewName: '',
            isNewBio: ''
        }
    }


   token = this.sessionService.getToken();

    changeUserInfo() {
        const token = this.sessionService.getToken()

        if(token !== 'qtOlPSDCG1JfWZzHNqDflGWE2OYZQuCkwr2q1cfGhtcn6MoDkSXraU2hsDk8p0CZiZGRvJkhwieb26ejCmhTX8osga6L6pTjdEmiBFVkXf0cG007we6BduhRZniODe7HRsk133wW0BP6mjfXPdQTEiTQ5uXWjn9Ued0NJtTCYZZBt5vTlNLQErQreJGCwpkF8N8cTG4hC1aEDEi2atyja6QRK4ziBbnqzBjVJXRyDyLV8TElogJKoxW20RYfqxX9ZM8ZML3jN7rJoT59jFB2lMbqODeLC0kgy23hyOo1B2RHLN6BH4fnL79qIaC5B43qCAWyPz2GsACEHHuzCUolD4cjpxaqjJYtUXwIErx1') {
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
            if(this.token !== null) {
                formData.append('tokenCookie', this.token)
            }
         
            fetch(apiUrl, {
                method: 'POST',
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
                        this.editProfileService.currentImage = ''
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
        } else {
            this.errorSuccessService.enableError();
            this.errorSuccessService.setError('This account is limited, so please be aware of its restrictions');
        }

    }
    
    
}