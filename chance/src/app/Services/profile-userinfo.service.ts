import { Injectable } from "@angular/core";
import { BlankService } from "./blank.service";
import { GlobalVars } from "../utils/global";
import { UserInfoService } from "./get-userinfo.service";
import { LoadingService } from "./loading.service";
import { BehaviorSubject, Observable } from "rxjs";

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

interface profilesPublicFollowing {
  profile_photo: string | undefined
  prqkor: string | undefined
  name: string | undefined
}

interface profilesPublicFollowers {
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

  usersPublicFollowing: profilesPublicFollowing[] = [
    { profile_photo: '', prqkor: '', name: '' },
  ];
  usersPublicFollowers: profilesPublicFollowers[] = [
    { profile_photo: '', prqkor: '', name: '' },
  ];

  constructor(private blanKService: BlankService, private globalVars: GlobalVars, private userInfoService: UserInfoService, private loadserService: LoadingService) {
  }

  hasFollowers: boolean = true
  hasFollowing: boolean = true

  hasFollowersPublic: boolean = true
  hasFollowingPublic: boolean = true





  

  public isProfile = new BehaviorSubject<boolean>(false);
  profile$: Observable<boolean> = this.isProfile.asObservable();

  public isPublicProfile = new BehaviorSubject<boolean>(false);
  publicProfile$: Observable<boolean> = this.isPublicProfile.asObservable();


  info: string = ''
  publicInfo: string = ''

  toggleProfile() {
    const currentValue = this.isProfile.getValue();
    this.isProfile.next(!currentValue)

    if (currentValue === true) {
      this.blanKService.disableBlank()
    } else {
      this.blanKService.enableBlank()
    }
  }

  setEnable() {
    this.isProfile.next(true)
    this.blanKService.enableBlank()
  }

  setDisable() {
    this.isProfile.next(false)
    this.blanKService.disableBlank()
  }

  togglePublicProfile() {
    const currentValue = this.isPublicProfile.getValue();
    this.isPublicProfile.next(!currentValue)

    if (currentValue === true) {
      this.blanKService.disableBlank()
    } else {
      this.blanKService.enableBlank()
    }
  }

  setPublicEnable() {
    window.scroll(0,0)
    this.isPublicProfile.next(true)
    this.blanKService.enableBlank()
  }

  setPublicDisable() {
    this.isPublicProfile.next(false)
    this.blanKService.disableBlank()
  }

  disableBoth() {
    this.isPublicProfile.next(false)
    this.isProfile.next(false)
    this.blanKService.disableBlank()
  }


  getFollowing() {
    this.usersFollowing = []
    this.hasFollowers = true;
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
        this.loadserService.mimicMini(6, 1000)
        this.usersFollowing = data.users
        if (data.users.length > 0) {
          this.hasFollowing = true;
        } else {
          this.hasFollowing = false;
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


  getFollowers() {
    this.usersFollowers = []
    this.hasFollowing = true;
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
        this.loadserService.mimicMini(6, 1000)
        this.usersFollowers = data.users
        console.log(data)
        if (data.users.length > 0) {
          this.hasFollowers = true;
        } else {
          this.hasFollowers = false;
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getPublicFollowing(user: string | null) {
    this.usersPublicFollowing = []
    this.hasFollowersPublic = true;
    const apiUrl = this.globalVars.apiUrl + '/viewFollowing';


    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    })
      .then(response => {
        if (!response.ok) {

          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.loadserService.mimicMini(6, 1000)
        this.usersPublicFollowing = data.users
        if (data.users.length > 0) {
          this.hasFollowingPublic = true;
        } else {
          this.hasFollowingPublic = false;
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  getPublicFollowers(user: string | null) {
    this.usersPublicFollowers = []
    this.hasFollowingPublic = true;
    const apiUrl = this.globalVars.apiUrl + '/viewFollowers';


    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    })
      .then(response => {
        if (!response.ok) {

          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.loadserService.mimicMini(6, 1000)
        this.usersPublicFollowers = data.users
        if (data.users.length > 0) {
          this.hasFollowersPublic = true;
        } else {
          this.hasFollowersPublic = false;
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }


}