import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";


@Injectable()
export class SessionService {
    
    session: boolean = false;
    username: string = ''
    userId: number = -1;

    setToken(t : string) {
        localStorage.setItem('token', t)
    }

    removeToken() {
        localStorage.removeItem('token')
    }

    getToken() {
        return localStorage.getItem('token')
    }


    constructor(private globalVars : GlobalVars) {}
//
    async checkIfLogged(): Promise<void> {
        const url =  this.globalVars.apiUrl + '/checkIfLogged';
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({tokenCookie: this.getToken()})
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                this.session = false;
                throw new Error('Session check failed');
            }
            const data = await response.json();

            this.session = data.message;
        } catch (error) {
           // console.error('Error:', error);
           this.session = false;
        }
    }

    
}
