import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";

interface allPosts{
    id: number;
    image: string;
}


@Injectable()
export class DiscoverService {

    allPosts: allPosts[] = [
        { id: 0, image: '' },
    ];

    constructor(private globalVars: GlobalVars) {  }

    getAllPosts() {
        const apiUrl = this.globalVars.apiUrl + '/getAllPosts';

        fetch(apiUrl, {
            method: 'POST',
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
                this.allPosts = data
                this.allPosts.sort((a, b) => Number(b.id) - Number(a.id));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


}