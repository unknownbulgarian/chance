import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { LoadingService } from "./loading.service";

interface userInfo {
    postCount: number;
    totalLikes: number;
    totalComments: number;
    totalFavorites: number;
    totalDownloads: number;
    totalViews: number;
}

@Injectable()
export class DashboardService {

    userInfo: userInfo;

    constructor(private globalVars: GlobalVars, private loaderService : LoadingService) {
        this.userInfo = {
            postCount: 0,
            totalLikes: 0,
            totalComments: 0,
            totalFavorites: 0,
            totalDownloads: 0,
            totalViews: 0,
        }
    }

    getUserInfo() {
        this.loaderService.miniLoadedSubject.next(15)
        const apiUrl = this.globalVars.apiUrl + '/getUserStats';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.userInfo = data
                
                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 1600);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


}