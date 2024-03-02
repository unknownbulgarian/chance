import { Injectable } from "@angular/core";


@Injectable()
export class SessionService {
    session: boolean = false;
    username: string = ''
    userId: number = -1;

    async checkIfLogged(): Promise<void> {
        const url = 'http://localhost:3001/checkIfLogged';
        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 
            },
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
        }
    }

    
}
