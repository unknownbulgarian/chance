import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { ErrorSuccessService } from "./error-success.service";
import { Router } from "@angular/router";
import { SessionService } from "./session.service";

interface uploadData {
    caption: string
    image: any
}


@Injectable()
export class UploadService {

    userData: uploadData

    constructor(private router: Router, private globalVars: GlobalVars, private errorSuccessService: ErrorSuccessService, private sessionService: SessionService) {
        this.userData = {
            caption: '',
            image: ''
        }
    }

    currentUpload: string = ''
    theCategorie: string = 'Other';

    token = this.sessionService.getToken()

    upload() {
        this.errorSuccessService.reset();
        this.errorSuccessService.resetSuccess();
        const apiUrl = this.globalVars.apiUrl + '/uploadPost';

        const formData = new FormData();
        if (this.userData.image) {
            formData.append('imagePost', this.userData.image);
        }
        formData.append('caption', this.userData.caption);
        formData.append('categorie', this.theCategorie)
        if (this.token !== null) {
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
                    this.errorSuccessService.setSuccess(data.message);
                    this.errorSuccessService.enableSuccessTime(1200);

                    this.userData.caption = ''
                    this.userData.image = '';
                    this.currentUpload = '';


                    setTimeout(() => {
                        this.router.navigate(['/profile'])
                    }, 1300);

                    setTimeout(() => {
                        this.errorSuccessService.disableBoth()
                    }, 1600);
                }
            })
            .catch(async error => {
                console.error('Error:', error);
                this.errorSuccessService.setError(error)
                this.errorSuccessService.enableError()
            });
    }

}