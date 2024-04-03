import { Injectable } from "@angular/core";
import { LoadingService } from "./loading.service";
import { GlobalVars } from "../utils/global";
import { SessionService } from "./session.service";
import { Title } from "@angular/platform-browser";

interface userInfo {
    prqkor: string;
    name: string;
    bio: string;
    friends: number;
    followers: number;
    following: number;
    id: number;
    em?: string;
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

    isProfile : boolean = false;

    userData: userInfo;
    publicUserData: publicUserInfo;

    notFound : boolean = false;

    constructor(public title : Title, private loaderService: LoadingService, private globalVars: GlobalVars, private sessionService : SessionService) {
        this.userData = {
            prqkor: '',
            name: '',
            bio: '',
            friends: 0,
            followers: 0,
            following: 0,
            id: 0,
            em: '',
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

        this.loaderService.miniLoadedSubject.next(0)

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tokenCookie: this.sessionService.getToken()})
        })
            .then(response => {
                if (!response.ok) {
                    setTimeout(() => {
                        this.loaderService.miniLoadedSubject.next(100)
                    }, 1000);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.userData = data.user
                this.userData.profile_photo = data.profile_photo
               // console.log(data)
               setTimeout(() => {
                this.loaderService.miniLoadedSubject.next(100)
               }, 1000);
           //     console.log(data)

           if(this.isProfile) {
            this.title.setTitle('Chance - Profile ' + this.userData.prqkor + ' | ' +
            this.userData.followers + ' | ' + this.userData.following + ' | ' + this.userData.friends)
           }
         

            })
            .catch(error => {
                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 1000);
                console.error('Error:', error);
            });
    }

    getPublicUserData(isUser: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/getUserInfo';
        this.loaderService.miniLoadedSubject.next(0)

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isUser }),
        })
            .then(response => {
                if (!response.ok) {
                    this.notFound = true
                    this.loaderService.miniLoadedSubject.next(100)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                    
                }
                return response.json();
            })
            .then(data => {
                this.publicUserData = data.user
                this.publicUserData.profile_photo = data.profile_photo
                this.title.setTitle('Chance - Profile ' + this.publicUserData.prqkor + ' | ' +
                this.publicUserData.followers + ' | ' + this.publicUserData.following + ' | ' + this.publicUserData.friends)
                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                    
                }, 1000);
            })
            .catch(error => {
                this.notFound = true
                this.loaderService.miniLoadedSubject.next(100)
                console.error('Error:', error);
            });
    }
}