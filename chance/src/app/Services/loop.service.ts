import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";

//the main loops
//I will not implement sockets for now

interface allNotifications{
    id: number;
    date: string;
    notification: string;
    type: string;
    username: string;
    profile_photo: string;
}

@Injectable()
export class LoopService {

    usersNotifications: allNotifications[] = [
        { id: 0 ,date: '', notification: '', type: '', username: '', profile_photo: '' },
      ];

    constructor(private globalVars: GlobalVars) { }

    theNotifications : number = 0;


    call() {
        this.notifications()
    }


    notifications() {
        const apiUrl = this.globalVars.apiUrl + '/getNotifications';

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
               this.usersNotifications = data.notifications
                this.theNotifications = data.notifications.length
            })
            .catch(error => {
              //  console.error('Error:', error);
            });
    }
}