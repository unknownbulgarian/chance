import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { ErrorSuccessService } from './error-success.service';


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

    constructor(private router: Router, private errorSuccessService: ErrorSuccessService) {
        this.user = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            date: ''
        }
    }

    sendUserData(): void {
        this.errorSuccessService.reset()
        this.errorSuccessService.resetSuccess()
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
                if (data.error) {
                    this.errorSuccessService.setError(data.error)
                    this.errorSuccessService.enableError()
                }

                if (!data.error) {
                    this.errorSuccessService.setSuccess('Account successfully created!')
                    this.errorSuccessService.enableSuccess()

                    setTimeout(() => {
                        this.router.navigate(['/profile'])
                    }, 1500);
                }
            })
            .catch(error => {
                this.errorSuccessService.setError(error)
                this.errorSuccessService.enableError()
            });
    }
}