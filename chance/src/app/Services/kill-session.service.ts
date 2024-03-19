import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { ErrorSuccessService } from "./error-success.service";
import { Router } from "@angular/router";
import { LoadingService } from "./loading.service";
import { SessionService } from "./session.service";
import { UserInfoService } from "./get-userinfo.service";
import { NavBarService } from "./navbar.service";


@Injectable()
export class Killer {

    constructor(private navBarService : NavBarService, private userInfoService: UserInfoService, private globalVars: GlobalVars, private errorSuccessService: ErrorSuccessService, private router: Router, private loaderService: LoadingService,
        private sessionService: SessionService) { }


    KillSession() {
        const apiUrl = this.globalVars.apiUrl + '/logout';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    this.errorSuccessService.enableError()
                    this.errorSuccessService.setError('Something went wrong')
                }
                if (!data.error) {

                    this.userInfoService.userData = {
                        bio: '',
                        followers: 0,
                        following: 0,
                        friends: 0,
                        id: 0,
                        name: '',
                        profile_photo: '',
                        prqkor: ''
                    }

                    this.navBarService.searchString = ''
                    this.navBarService.accountString = ''
                    this.navBarService.isSearch = false
                    this.navBarService.isAccountSearch = false



                    this.errorSuccessService.enableSuccess()
                    this.errorSuccessService.setSuccess('Logging out')

                    setTimeout(() => {
                        this.errorSuccessService.disableBoth()
                        this.sessionService.checkIfLogged()
                        this.loaderService.mimic(0, 1600)
                        this.router.navigate(['/'])
                    }, 1600);
                }


            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}