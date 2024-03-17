import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";

interface userPosts{
    id: number
    caption: string
    username: string
    image: string

}

@Injectable()
export class GetPostsService{

    posts: userPosts[] = [
        { id: 0, caption: '', username: '',  image: '' },
    ];

    constructor(private globalVars: GlobalVars) {}

    getPosts(user : string | null) {
        const apiUrl = this.globalVars.apiUrl + '/getPosts';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user}),
        })
            .then(response => {
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
              this.posts = data
              this.posts.sort((a, b) => Number(b.id) - Number(a.id));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


}