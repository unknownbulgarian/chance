import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { LoadingService } from "./loading.service";

interface allPosts {
    id: number;
    image: string;
}

interface categoriePosts {
    id: number;
    image: string;
}


@Injectable()
export class DiscoverService {

    allPosts: allPosts[] = [
        { id: 0, image: '' },
    ];

    categoriePosts: categoriePosts[] = [
        { id: 0, image: '' },
    ];

    theCategorie : string = 'All'

    constructor(private globalVars: GlobalVars, private loaderService : LoadingService) { }

    getAllPosts() {
        const apiUrl = this.globalVars.apiUrl + '/getAllPosts';

        this.loaderService.miniLoadedSubject.next(0)

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

                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 800);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getCategoriePosts(categorie: string) {
        const apiUrl = this.globalVars.apiUrl + '/getCategoriePosts';

        this.loaderService.miniLoadedSubject.next(0)

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({categorie})
        })
            .then(response => {
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.categoriePosts = data
                this.categoriePosts.sort((a, b) => Number(b.id) - Number(a.id));
                
                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 800);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


}