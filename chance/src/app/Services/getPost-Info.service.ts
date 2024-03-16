import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";

interface postInfo {
    caption: string
    id: number
    image: string
    likes: number
    comments: number
    favorites: number
}

interface userInfo {
    prqkor: string
    name: string
    bio: string
    profile_photo: string
}

interface actionInfo{
    liked: boolean
    favorited: boolean
}


@Injectable()
export class GetPostInfoService {

    postInfo: postInfo;
    userInfo: userInfo;
    actionInfo: actionInfo



    constructor(private globalVars: GlobalVars) {
        this.postInfo = {
            caption: '',
            id: 0,
            image: '',
            likes: 0,
            comments: 0,
            favorites: 0
        }

        this.userInfo = {
            prqkor: '',
            name: '',
            bio: '',
            profile_photo: '',
        }

        this.actionInfo = {
            liked: false,
            favorited: false,
        }
    }

    getnfo(id: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/getPostInfo';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.postInfo = data
                this.userInfo = data.user
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getActionInfo() {
        const apiUrl = this.globalVars.apiUrl + '/getPostInfo';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    

}