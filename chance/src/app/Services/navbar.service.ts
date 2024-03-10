import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { LoopService } from "./loop.service";


interface historyNotifications {
    id: number;
    date: string;
    notification: string;
    type: string;
    username: string;
    profile_photo: string;
}

@Injectable()
export class NavBarService {
    isProfile: boolean = false
    isNotification: boolean = false

    usersHistoryNotifications: historyNotifications[] = [
        { id: 0, date: '', notification: '', type: '', username: '', profile_photo: '' },
    ];

    constructor(private globalVars: GlobalVars, private loopService: LoopService) { }

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
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                this.usersHistoryNotifications = data.notifications
            })
            .catch(error => {
            });
    }

    seenNotification() {
        const apiUrl = this.globalVars.apiUrl + '/seenNotification';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
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
}