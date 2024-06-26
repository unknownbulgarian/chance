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
    post_id: number;
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
    selectedUser : string = ''

    constructor(private globalVars: GlobalVars, private sessionService: SessionService,) {}


    usersNotifications: allNotifications[] = [
        { id: 0, date: '', notification: '', type: '', username: '', profile_photo: '', post_id: 0 },
    ];

    usersMessages: chatMessages[] = [
        { id: 0, sender_id: 0, receiver_id: 0, message: '', sender_seen: 0, timestamp: '', removed: 0 },
    ];





    theNotifications: number = 0;


    chatLoop : any;
    
    callChat() {
        if(this.selectedUser !== '') {
            clearInterval(this.chatLoop)
            this.chatLoop = setInterval(() => {
                this.getChat(this.selectedUser)
            }, 600)
        }
    }


    call() {
        if (this.sessionService.session === true) {
            this.notifications()
        }
    }


    notifications() {
        const apiUrl = this.globalVars.apiUrl + '/getNotifications';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff', 
                'Cache-Control': 'no-cache',
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
            headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff', 
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify({ user, tokenCookie: this.sessionService.getToken()  }),

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