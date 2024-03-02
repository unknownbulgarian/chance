import { Injectable } from "@angular/core";


@Injectable()
export class NavBarService {
    isProfile: boolean = false
    isNotification: boolean = true

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

        if(this.isNotification) {
            this.isProfile = false
        }
    }

    enableNotification() {
        this.isNotification = true
        this.isProfile = false
    }

    disableNotification() {
        this.isNotification = false
    }
}