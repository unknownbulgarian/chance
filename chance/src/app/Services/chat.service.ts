import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";

interface followingProfiles {
    message: string
    timestamp: string
    prqkor: string
}

interface requestProfiles {
    message: string
    timestamp: string
    prqkor: string
}


@Injectable()
export class ChatService {

    followingUsers: followingProfiles[] = [
        { message: '', timestamp: '', prqkor: '' },
    ];

    requestUsers: requestProfiles[] = [
        { message: '', timestamp: '', prqkor: '' },
    ];


    constructor(private globalVars: GlobalVars) { }

    getFollowing() {
        const apiUrl = this.globalVars.apiUrl + '/getFollowingChat';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    //   this.loaderService.loadedSubject.next(1)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.followingUsers = data
                console.log(data)

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getRequests() {
        const apiUrl = this.globalVars.apiUrl + '/getRequestChat';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    //   this.loaderService.loadedSubject.next(1)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
               this.requestUsers = data
                console.log(data)

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}