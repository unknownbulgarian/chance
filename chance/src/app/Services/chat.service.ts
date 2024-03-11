import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { ErrorSuccessService } from "./error-success.service";
import { LoopService } from "./loop.service";
import { LoadingService } from "./loading.service";

interface followingProfiles {
    last_message: string
    message_time: string
    prqkor: string
    profile_photo: string
}

interface requestProfiles {
    message: string
    timestamp: string
    prqkor: string
    profile_photo: string
}


@Injectable()
export class ChatService {

    isChatEnabled : boolean = false;
    isFollowing: boolean = false;
    isRequests: boolean = false;
    isCurrentRequest : boolean = false;

    followingUsers: followingProfiles[] = [
        { last_message: '', message_time: '', prqkor: '',  profile_photo: '' },
    ];

    requestUsers: requestProfiles[] = [
        { message: '', timestamp: '', prqkor: '',  profile_photo: '' },
    ];


    constructor(private globalVars: GlobalVars, private errorSuccessService: ErrorSuccessService, private loopService : LoopService,
        private loaderService: LoadingService) { }

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
     // console.log(data)


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
           //     console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    sendChat( message : string, user : string) {
        const apiUrl = this.globalVars.apiUrl + '/sendChatMessage';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message, user}),
        })
            .then(response => {
                if (!response.ok) {
                    //   this.loaderService.loadedSubject.next(1)
                    this.errorSuccessService.enableError()
                    this.errorSuccessService.setError('Something went wrong')
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
               //console.log(data.message)
              this.loopService.getChat(user)
              this.getFollowing()
              this.getRequests()

    
            })
            .catch(error => {
               this.errorSuccessService.enableError()
               this.errorSuccessService.setError('Something went wrong')
                console.error('Error:', error);
            });
    }


}