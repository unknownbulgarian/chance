import { Injectable } from "@angular/core";
import { LoadingService } from "./loading.service";
import { GlobalVars } from "../utils/global";

interface userInfo {
    prqkor: string;
    name: string;
    bio: string;
    friends: number;
    followers: number;
    following: number;
    id: number;
    profile_photo: any
}

@Injectable()
export class UserInfoService {

    userData: userInfo;

    constructor(private loaderService: LoadingService, private globalVars: GlobalVars) {
        this.userData = {
            prqkor: '',
            name: '',
            bio: '',
            friends: 0,
            followers: 0,
            following: 0,
            id: 0,
            profile_photo: ''
        }
    }

    getUserData() {
        const apiUrl = this.globalVars.apiUrl + '/viewProfile';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    this.loaderService.loaded = 1;
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.userData = data.user
                this.userData.profile_photo = data.profile_photo

                console.log(data)

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}