import { Injectable } from "@angular/core";
import { LoadingService } from "./loading.service";

interface userInfo {
    prqkor: string;
    name: string;
    bio: string;
    friends: number;
    followers: number;
    following: number;
}

@Injectable()
export class UserInfoService {

    userData: userInfo;

    constructor(private loaderService: LoadingService) {
        this.userData = {
            prqkor: '',
            name: '',
            bio: '',
            friends: 0,
            followers: 0,
            following: 0
        }
    }

    getUserData() {
        const apiUrl = 'http://localhost:3001/viewProfile';

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
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}