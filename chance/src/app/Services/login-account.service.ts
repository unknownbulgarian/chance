import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { ErrorSuccessService } from './error-success.service';
import { LoadingService } from './loading.service';
import { UserInfoService } from './get-userinfo.service';
import { GlobalVars } from '../utils/global';
import { LoginService } from './login.service';


interface userData {
    email: string,
    password: string,
}


@Injectable()
export class LoginAccountService {

    user: userData

    constructor(private globalVars: GlobalVars, private router: Router, private errorSuccessService: ErrorSuccessService, private loadingService: LoadingService, private userInfoService: UserInfoService,
       private loginService: LoginService ) {
        this.user = {
            email: '',
            password: '',
        }
    }

    sendUserData(): void {
        this.errorSuccessService.reset()
        this.errorSuccessService.resetSuccess()
        const apiUrl = this.globalVars.apiUrl + '/login';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.user),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    this.errorSuccessService.setError(data.error)
                    this.errorSuccessService.enableError()
                }

                if (!data.error) {
                    this.errorSuccessService.setSuccess('Logged in successfully!')
                    this.errorSuccessService.enableSuccess()

                    setTimeout(() => {
                        this.userInfoService.getUserData()
                        this.loginService.disableLogin()
                        this.errorSuccessService.disableBoth()
                        this.loadingService.mimic(1600)
                        this.router.navigate(['/profile'])
                    }, 1500);
                }
            })
            .catch(error => {
                this.errorSuccessService.setError(error)
                this.errorSuccessService.enableError()
            });
    }
}