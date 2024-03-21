import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { SessionService } from "./session.service";
import { BehaviorSubject, Observable } from "rxjs";
import { ChatService } from "./chat.service";

//the main loops
//I will not implement sockets for now

interface allNotifications {
    id: number;
    date: string;
    notification: string;
    type: string;
    username: string;
    profile_photo: string;
}

interface chatMessages {
    id: number
    sender_id: number
    receiver_id: number
    message: string
    sender_seen: number
    timestamp: string
    removed: number
}

@Injectable()
export class LoopService {
    public selectedUser = new BehaviorSubject<string>('');
    selectedUser$: Observable<string> = this.selectedUser.asObservable();

    constructor(private globalVars: GlobalVars, private sessionService: SessionService,) { }



    getTheChat = setInterval(() => {
        const selectedUser = this.selectedUser.getValue();
        if (selectedUser !== '') {

            this.getChat(selectedUser);
        }

    }, 1000);

    usersNotifications: allNotifications[] = [
        { id: 0, date: '', notification: '', type: '', username: '', profile_photo: '' },
    ];

    usersMessages: chatMessages[] = [
        { id: 0, sender_id: 0, receiver_id: 0, message: '', sender_seen: 0, timestamp: '', removed: 0 },
    ];



    theNotifications: number = 0;


    call() {
        if (this.sessionService.session === true) {
            this.notifications()
        }
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
                //console.log(data)
                this.usersNotifications = data.notifications

                this.usersNotifications.sort((a, b) => Number(b.id) - Number(a.id));
                this.theNotifications = data.notifications.length
            })
            .catch(error => {
                //  console.error('Error:', error);
            });
    }

    getChat(user: string) {
        const apiUrl = this.globalVars.apiUrl + '/getChat';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),

        })
            .then(response => {
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.usersMessages = data.messages

            })
            .catch(error => {
                //  console.error('Error:', error);
            });
    }
} 