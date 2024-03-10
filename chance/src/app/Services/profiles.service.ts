import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { LoadingService } from "./loading.service";
import { ErrorSuccessService } from "./error-success.service";
import { UserInfoService } from "./get-userinfo.service";
import { ActivatedRoute } from "@angular/router";


@Injectable()
export class ProfilesService {

    isFollow: boolean = false
    isFriend: boolean = false
    isRequested: boolean = false
    isId : number = 0

    constructor(private globalVars: GlobalVars, private loaderService: LoadingService, public errorSuccessService: ErrorSuccessService, public userInfoService: UserInfoService,
        public route: ActivatedRoute) { }



    checkIfFollow(userId: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/followChecker';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then(response => {
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.isFollow = data.message
           
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    followUser(followingId: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/follow';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ followingId }),
        })
            .then(response => {
                if (!response.ok) {
                    this.errorSuccessService.enableError()
                    this.errorSuccessService.setError('Something went wrong')
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                this.loaderService.mimicMini(5, 1000)


                this.userInfoService.getPublicUserData(followingId)
                this.checkIfFollow(followingId)

            })
            .catch(error => {
                console.error('Error:', error);
                this.errorSuccessService.enableError()
                this.errorSuccessService.setError('Something went wrong')

                setTimeout(() => {
                    this.loaderService.mimic(5, 0)
                    this.errorSuccessService.disableBoth()
                }, 1700);
            });

    }

    unfollowUser(followingId: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/unFollow';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ followingId }),
        })
            .then(response => {
                if (!response.ok) {
                    this.errorSuccessService.enableError()
                    this.errorSuccessService.setError('Something went wrong')
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.loaderService.mimicMini(5, 1000)


                this.userInfoService.getPublicUserData(followingId)
                this.checkIfFollow(followingId)

            })
            .catch(error => {
                console.error('Error:', error);
                this.errorSuccessService.enableError()
                this.errorSuccessService.setError('Something went wrong')

                setTimeout(() => {
                    this.loaderService.mimic(5, 0)
                    this.errorSuccessService.disableBoth()
                }, 1700);

            });
    }

}
