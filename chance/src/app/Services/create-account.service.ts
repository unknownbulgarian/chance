import { Injectable } from '@angular/core';
import { Router } from "@angular/router";


interface userData {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    date: string
}


@Injectable()
export class CreateAccountService {

    user: userData

    constructor(private router: Router) {
        this.user = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            date: ''
        }
    }

    sendUserData(): void {
        const apiUrl = 'http://localhost:3001/register';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.user),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data sent successfully:', data);
                if (!data.error) {
                    this.router.navigate(['/'])
                }
            })
            .catch(error => {
                console.error('Error sending data:', error);

            });
    }
}