import { Injectable } from "@angular/core";
import { BlankService } from "./blank.service";
import { GlobalVars } from "../utils/global";
import { UserInfoService } from "./get-userinfo.service";
import { LoadingService } from "./loading.service";

interface profilesFollowing {
  profile_photo: string | undefined
  prqkor: string | undefined
  name: string | undefined
}

interface profilesFollowers {
  profile_photo: string | undefined
  prqkor: string | undefined
  name: string | undefined
}


@Injectable()
export class ProfileUserInfoService {

  usersFollowing: profilesFollowing[] = [
    { profile_photo: '', prqkor: '', name: '' },
  ];
  usersFollowers: profilesFollowers[] = [
    { profile_photo: '', prqkor: '', name: '' },
  ];

  constructor(private blanKService: BlankService, private globalVars: GlobalVars, private userInfoService: UserInfoService, private loadserService: LoadingService) {
  }

  isProfile: boolean = false
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


  getFollowing() {
    this.usersFollowing = []
    const apiUrl = this.globalVars.apiUrl + '/viewFollowing';


    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: this.userInfoService.userData.prqkor }),
    })
      .then(response => {
        if (!response.ok) {

          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.loadserService.mimicMini(1000)
        this.usersFollowing = data.users
        console.log(data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


  getFollowers() {
    this.usersFollowers =  []
    const apiUrl = this.globalVars.apiUrl + '/viewFollowers';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: this.userInfoService.userData.prqkor }),
    })
      .then(response => {
        if (!response.ok) {

          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.loadserService.mimicMini(1000)
        this.usersFollowers = data.users
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }



}