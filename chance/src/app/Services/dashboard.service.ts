import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";

interface userInfo {
    posts: number;
    likes: number;
    downloads: number;
    favorites: number;
    views: number;
}

@Injectable()
export class DashboardService {

    userInfo: userInfo;

    constructor(private globalVars: GlobalVars) {
        this.userInfo = {
            posts: 0,
            likes: 0,
            downloads: 0,
            favorites: 0,
            views: 0
        }
    }

    getUserInfo() {
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
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


}