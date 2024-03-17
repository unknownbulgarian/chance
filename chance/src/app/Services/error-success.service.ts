import { Injectable } from "@angular/core";



@Injectable({ providedIn: 'root' })
export class ErrorSuccessService {

    constructor() { }


    isError: boolean = false
    error: string = ''


    isSuccess: boolean = false
    success: string = ''


    toggleError() {
        this.isError = !this.isError
        if (this.isError) {
            window.scroll(0, 0)
        }
    }

    enableError() {
        this.disableSuccess()
        this.clearSuccess()
        this.isError = true
        window.scroll(0, 0)
    }

    enableErrorTime(time: number) {
        this.enableError()
        this.disableSuccess()
        window.scroll(0, 0)
        setTimeout(() => {
            this.disableBoth()
        }, time);
    }

    disableError() {
        this.isError = false
    }

    setError(error: string) {
        this.error = error
    }

    clearError() {
        this.error = ''
    }

    reset() {
        if (this.isError === true) {
            this.isError = false
            setTimeout(() => {
                this.isError = true
            }, 1);
        }
    }

    toggleSuccess() {
        this.isSuccess = !this.isSuccess
        if(this.isSuccess) {
            window.scroll(0, 0)
        }
    }

    enableSuccess() {
        this.disableError()
        this.clearError()
        this.isSuccess = true
        window.scroll(0, 0)
    }

    enableSuccessTime(time: number) {
        this.enableSuccess()
        this.disableError()
        window.scroll(0, 0)
        setTimeout(() => {
            this.disableBoth()
        }, time);
    }

    disableSuccess() {
        this.isSuccess = false
    }

    setSuccess(success: string) {
        this.success = success
    }

    clearSuccess() {
        this.success = ''
    }

    resetSuccess() {
        if (this.isSuccess === true) {
            this.isSuccess = false
            setTimeout(() => {
                this.isSuccess = true
            }, 1);
        }
    }


    disableBoth() {
        this.disableError()
        this.clearError()
        this.disableSuccess()
        this.clearSuccess()
    }
}


