import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { ErrorSuccessService } from "./error-success.service";

interface uploadData{
    caption: string
    image: any
}


@Injectable()
export class UploadService{

    userData: uploadData

    constructor(private globalVars: GlobalVars, private errorSuccessService: ErrorSuccessService) {
        this.userData = {
            caption: '',
            image: ''
        }
    }


    upload() {
        this.errorSuccessService.reset();
        this.errorSuccessService.resetSuccess();
        const apiUrl = this.globalVars.apiUrl + '/uploadPost';
    
        const formData = new FormData();
        if (this.userData.image) {
            formData.append('imagePost', this.userData.image);
        }
        formData.append('caption', this.userData.caption);
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
                }, 1600);
            }
        })
        .catch(async error => {
            console.error('Error:', error);
            this.errorSuccessService.setError('Something went wrong');
        });
    }

}