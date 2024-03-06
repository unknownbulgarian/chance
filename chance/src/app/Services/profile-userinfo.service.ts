import { Injectable } from "@angular/core";
import { BlankService } from "./blank.service";


@Injectable()
export class ProfileUserInfoService {

  constructor(private blanKService: BlankService) { }

  isProfile: boolean = true
  info: string = ''

  toggleProfile() {
    this.isProfile = !this.isProfile

    if (this.isProfile === true) {
      this.blanKService.disableBlank()
    } else {
      this.blanKService.enableBlank()
    }
  }

  setEnable() {
    this.isProfile = true
    this.blanKService.enableBlank()
  }

  setDisable() {
    this.isProfile = false
    this.blanKService.disableBlank()
  }


}