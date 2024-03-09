import { Injectable } from "@angular/core";
import { BlankService } from "./blank.service";

@Injectable()
export class EditProfileService{

    constructor(private blankService: BlankService) {}

    isEdit = false;

    toggleEdit() {
        this.isEdit = !this.isEdit
        if(this.isEdit === true) {
            this.blankService.enableBlank()
        } else {
            this.blankService.disableBlank()
        }
    }
    
    enableEdit() {
        this.isEdit = true
        this.blankService.enableBlank()
    }

    disableEdit() {
        this.isEdit = false
        this.blankService.disableBlank()
    }
}