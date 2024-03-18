import { Injectable } from "@angular/core";
import { BlankService } from "./blank.service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class EditProfileService{

    constructor(private blankService: BlankService) {}

    public editSubject = new BehaviorSubject<boolean>(false);
    edit$: Observable<boolean> = this.editSubject.asObservable();

    currentImage  = ''
  

    toggleEdit() {
        const currentValue = this.editSubject.getValue();
        this.editSubject.next(!currentValue)
        if(currentValue === true) {
            this.blankService.enableBlank()
        } else {
            this.blankService.disableBlank()
        }
    }
    
    enableEdit() {
        this.editSubject.next(true)
        this.blankService.enableBlank()
    }

    disableEdit() {
        this.editSubject.next(false)
        this.blankService.disableBlank()
    }
}