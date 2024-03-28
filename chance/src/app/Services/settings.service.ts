import { Injectable } from "@angular/core";
import { BlankService } from "./blank.service";
import { BehaviorSubject, Observable } from "rxjs";
import { ErrorSuccessService } from "./error-success.service";
import { SessionService } from "./session.service";
import { GlobalVars } from "../utils/global";

interface passwordNewInfo {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}


@Injectable()
export class SettingsService {

    passwordInfo: passwordNewInfo;


    public isSettings = new BehaviorSubject<boolean>(false);
    isSettings$: Observable<boolean> = this.isSettings.asObservable();

    //main settings
    isDarkTheme: boolean = false
    isNotifications: boolean = true



    constructor(private errorSuccessService: ErrorSuccessService, private sessionService: SessionService, private globalVars: GlobalVars) {
        this.passwordInfo = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    }

    toggle() {
        const value = this.isSettings.getValue()

        this.isSettings.next(!value)

    }

    enable() {
        this.isSettings.next(true)
    }

    disable() {
        this.isSettings.next(false)
    }

    toggleDarkTheme() {
        this.isDarkTheme = !this.isDarkTheme
    }

    toggleNotifications() {
        this.isNotifications = !this.isNotifications
    }

    changePassword(): void {
        fetch(this.globalVars.apiUrl + '/changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ passwordInfo: this.passwordInfo, tokenCookie: this.sessionService.getToken() })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {

                if (data.error) {
                    this.errorSuccessService.setError(data.error)
                    this.errorSuccessService.enableError()
                } else {
                    this.passwordInfo = {
                        oldPassword: '',
                        newPassword: '',
                        confirmNewPassword: ''
                    };

                    this.errorSuccessService.setSuccess(data.message)
                    this.errorSuccessService.enableSuccess()

                    setTimeout(() => {
                        location.reload()
                    }, 1600);

                }

            })
            .catch(error => {
                //     this.errorSuccessService.showError('Error changing password.');
                console.error('Error:', error);
            });
    }

    changeEmail() {
        this.errorSuccessService.setError("You can't change your email")
        this.errorSuccessService.enableErrorTime(1700)
    }

    add2FA() {
        this.errorSuccessService.setError("Coming soon")
        this.errorSuccessService.enableErrorTime(1700)
    }


}