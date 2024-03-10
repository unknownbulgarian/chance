import { Injectable } from "@angular/core";
import { BlankService } from "./blank.service";
import { EditProfileService } from "./edit-profile.service";
import { LoadingService } from "./loading.service";


@Injectable()
export class ViewProfileService {

    constructor(private blankService: BlankService, private editProfileService: EditProfileService, private loaderService: LoadingService) { }

    view() {
        this.loaderService.mimic(1600)
        this.blankService.disableBlank()
        this.editProfileService.disableEdit()
    }
}