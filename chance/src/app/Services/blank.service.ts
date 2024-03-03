import { Injectable } from "@angular/core";

@Injectable()
export class BlankService {
    isBlank :  boolean = false;

    toggleBlank() {
        this.isBlank = !this.isBlank
    }

    enableBlank() {
        this.isBlank = true
    }

    disableBlank() {
        this.isBlank = false
    }
}