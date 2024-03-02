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
    }

    enableError() {
        this.disableSuccess()
        this.clearSuccess()
        this.isError = true
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
    }

    enableSuccess() {
        this.disableError()
        this.clearError()
        this.isSuccess = true
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


