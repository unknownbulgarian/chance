import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { LoopService } from "./loop.service";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from "./session.service";


interface historyNotifications {
    id: number;
    date: string;
    notification: string;
    type: string;
    username: string;
    profile_photo: string;
    post_id: number;
}


interface searchData {
    caption: string;
}

@Injectable()
export class NavBarService {
    isProfile: boolean = false
    isNotification: boolean = false

    usersHistoryNotifications: historyNotifications[] = [
        { id: 0, date: '', notification: '', type: '', username: '', profile_photo: '', post_id: 0 },
    ];

    followerNotifications: historyNotifications[] = [
        { id: 0, date: '', notification: '', type: '', username: '', profile_photo: '', post_id: 0 },
    ];

    downloadNotifications: historyNotifications[] = [
        { id: 0, date: '', notification: '', type: '', username: '', profile_photo: '', post_id: 0 },
    ];

    likesNotifications: historyNotifications[] = [
        { id: 0, date: '', notification: '', type: '', username: '', profile_photo: '', post_id: 0 },
    ];

    favoritesNotifications: historyNotifications[] = [
        { id: 0, date: '', notification: '', type: '', username: '', profile_photo: '', post_id: 0 },
    ];

    chatNotifications: historyNotifications[] = [
        { id: 0, date: '', notification: '', type: '', username: '', profile_photo: '', post_id: 0 },
    ];

    commentsNotifications: historyNotifications[] = [
        { id: 0, date: '', notification: '', type: '', username: '', profile_photo: '', post_id: 0 },
    ];

    searchData: searchData[] = [
        { caption: '' },
    ];

    searchString : string = ''
    accountString : string = ''

    isSearch : boolean = false
    isAccountSearch : boolean = false


    public currentPhoto = new BehaviorSubject<string>('');
    currentPhoto$: Observable<string> = this.currentPhoto.asObservable();

    constructor(private globalVars: GlobalVars, private loopService: LoopService, private sessionService : SessionService) { }

    toggleProfile() {
        this.isProfile = !this.isProfile

        if (this.isProfile) {
            this.isNotification = false
        }
    }

    enableProfile() {
        this.isProfile = true
        this.isNotification = false
    }

    disableProfile() {
        this.isProfile = false
    }

    toggleNotification() {
        this.isNotification = !this.isNotification

        if (this.isNotification) {
            this.isProfile = false
        } else {
            this.seenNotification()
        }
    }

    enableNotification() {
        this.isNotification = true
        this.isProfile = false
    }

    disableNotification() {
        this.isNotification = false
    }

    disableAll() {
        this.disableNotification()
        this.disableProfile()
    }

    getHistoryNotifications() {
        const apiUrl = this.globalVars.apiUrl + '/getHistoryNotifications';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tokenCookie: this.sessionService.getToken()})
        })
            .then(response => {
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.usersHistoryNotifications = data.notifications
                this.usersHistoryNotifications.sort((a, b) => Number(b.id) - Number(a.id));

                this.downloadNotifications = this.usersHistoryNotifications.filter(notification => notification.type === 'post_download');
 
                this.followerNotifications = this.usersHistoryNotifications.filter(notification => notification.type === 'follow');

                this.likesNotifications = this.usersHistoryNotifications.filter
                (notification => notification.type === 'post_like' || notification.type === 'comment_like');
                
                this.favoritesNotifications = this.usersHistoryNotifications.filter(notification => notification.type === 'post_favorite');

                this.chatNotifications = this.usersHistoryNotifications.filter(notification => notification.type === 'chat_message');

                this.commentsNotifications =  this.usersHistoryNotifications.filter(notification => notification.type === 'post_comment')

            })
            .catch(error => {
            });
    }

    seenNotification() {
        const apiUrl = this.globalVars.apiUrl + '/seenNotification';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tokenCookie: this.sessionService.getToken()})
        })
            .then(response => {
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.loopService.notifications()
            })
            .catch(error => {
            });

    }

    searchAll(search: string) {
        const apiUrl = this.globalVars.apiUrl + '/searchNav';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search })
        })
            .then(response => {
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.searchData = data
            })
            .catch(error => {
            });
    }
}