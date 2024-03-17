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

interface publicUserInfo {
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
    publicUserData: publicUserInfo;

    notFound : boolean = false;

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

        this.publicUserData = {
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
                    this.loaderService.loadedSubject.next(1)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.userData = data.user
                this.userData.profile_photo = data.profile_photo
                this.loaderService.mimicMini(4, 1000)
           //     console.log(data)

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getPublicUserData(isUser: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/getUserInfo';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            
            body: JSON.stringify({ isUser }),
        })
            .then(response => {
                if (!response.ok) {
                    this.loaderService.loadedSubject.next(1)
                    this.notFound = true
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.publicUserData = data.user
                this.publicUserData.profile_photo = data.profile_photo
                this.loaderService.mimicMini(4, 1000)
            })
            .catch(error => {
                this.notFound = true
                console.error('Error:', error);
            });
    }
}