import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { ErrorSuccessService } from "./error-success.service";
import { LoopService } from "./loop.service";
import { LoadingService } from "./loading.service";
import { BlankService } from "./blank.service";
import { SessionService } from "./session.service";
import { UserInfoService } from "./get-userinfo.service";

interface followingProfiles {
    message: string
    timestamp: string
    prqkor: string
    profile_photo: string
}

interface requestProfiles {
    message: string
    timestamp: string
    prqkor: string
    profile_photo: string
}

interface searchedUsers {
    prqkor: string
    profile_photo: string
}


@Injectable()
export class ChatService {


    followingUsers: followingProfiles[] = [
        { message: '', timestamp: '', prqkor: '', profile_photo: '' },
    ];

    requestUsers: requestProfiles[] = [
        { message: '', timestamp: '', prqkor: '', profile_photo: '' },
    ];

    theSearchedUsers: searchedUsers[] = [
        { prqkor: '', profile_photo: '' },
    ];

    constructor(private globalVars: GlobalVars, private errorSuccessService: ErrorSuccessService, private loopService: LoopService,
        private loaderService: LoadingService, private blankService: BlankService, private sessionService : SessionService, private userInfoService : UserInfoService) { }

    isChatEnabled: boolean = false;
    isFollowing: boolean = true;
    isRequests: boolean = false;
    isCurrentRequest: boolean = false;

    isEditChat: boolean = false;

    theCurrentProfilePhoto : string = ''


    //global vars for the chat comp

    defaultBackground: string = 'https://wallpapercave.com/wp/wp13467408.jpg'
    currentBackground: string = this.defaultBackground

    changeBackground(newBack: string) {
        this.currentBackground = newBack
    }



    toggleEdit() {
        this.isEditChat = !this.isEditChat

        if (this.isEditChat === true) {
            this.blankService.enableBlank()
        } else {
            this.blankService.disableBlank()
        }
    }

    setEdit(b: boolean) {
        this.isEditChat = b

        if (this.isEditChat === true) {
            this.blankService.enableBlank()
        } else {
            this.blankService.disableBlank()
        }
    }




    getFollowing() {
        const apiUrl = this.globalVars.apiUrl + '/getFollowingChat';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tokenCookie: this.sessionService.getToken()})
        })
            .then(response => {
                if (!response.ok) {
                    //   this.loaderService.loadedSubject.next(1)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.followingUsers = data.sort((a: any, b: any) => {
                    // Convert MySQL timestamps to JavaScript Date objects
                    const aMessageTime = new Date(a.message_time);
                    const bMessageTime = new Date(b.message_time);
                
                    // Compare the Date objects
                    if (aMessageTime > bMessageTime) {
                        return -1; // Move 'a' to a lower index
                    } else if (aMessageTime < bMessageTime) {
                        return 1; // Move 'b' to a lower index
                    } else {
                        // If the message times are equal, compare the ids
                        if (a.id > b.id) {
                            return -1; // Move 'a' to a lower index
                        } else if (a.id < b.id) {
                            return 1; // Move 'b' to a lower index
                        } else {
                            return 0; // Keep the order unchanged
                        }
                    }
                });
                
               // console.log(this.followingUsers)


            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getRequests() {
        const apiUrl = this.globalVars.apiUrl + '/getRequestChat';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tokenCookie: this.sessionService.getToken()})
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

    sendChat(message: string, user: string) {
        const apiUrl = this.globalVars.apiUrl + '/sendChatMessage';
        

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, user, tokenCookie: this.sessionService.getToken()}),
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

    searchUsers(user: string) {
        const apiUrl = this.globalVars.apiUrl + '/searchUsers';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, tokenCookie: this.sessionService.getToken() }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.theSearchedUsers = data
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    deleteMessage(id: number) {
        const apiUrl = this.globalVars.apiUrl + '/deleteChatMessage';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, tokenCookie: this.sessionService.getToken() }),
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
             
            })
            .catch(error => {
                this.errorSuccessService.enableError()
                this.errorSuccessService.setError('Something went wrong')
                console.error('Error:', error);
            });
    }


}