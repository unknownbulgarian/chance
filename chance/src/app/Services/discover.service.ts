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

interface allProfiles {
    id: number
    prqkor: string;
    name: string;
    profile_photo: string;
    bio: string;
    followers: number;
    following: number;
}




@Injectable()
export class DiscoverService {

    allPosts: allPosts[] = [
        { id: 0, image: '' },
    ];

    searchedPosts: allPosts[] = [
        { id: 0, image: '' },
    ];


    categoriePosts: categoriePosts[] = [
        { id: 0, image: '' },
    ];

    allProfiles: allProfiles[] = [
        { id: 0, prqkor: '', name: '', profile_photo: '', bio: '', followers: 0, following: 0 },
    ];

    recentProfiles: allProfiles[] = [
        { id: 0, prqkor: '', name: '', profile_photo: '', bio: '', followers: 0, following: 0 },
    ];

    popularProfiles: allProfiles[] = [
        { id: 0, prqkor: '', name: '', profile_photo: '', bio: '', followers: 0, following: 0 },
    ];

    mostFollowingProfiles: allProfiles[] = [
        { id: 0, prqkor: '', name: '', profile_photo: '', bio: '', followers: 0, following: 0 },
    ];

    mostFollowersProfiles: allProfiles[] = [
        { id: 0, prqkor: '', name: '', profile_photo: '', bio: '', followers: 0, following: 0 },
    ];

    mostPostsProfiles: allProfiles[] = [
        { id: 0, prqkor: '', name: '', profile_photo: '', bio: '', followers: 0, following: 0 },
    ];

    mostLikesProfiles: allProfiles[] = [
        { id: 0, prqkor: '', name: '', profile_photo: '', bio: '', followers: 0, following: 0 },
    ];

    mostFavoritesProfiles: allProfiles[] = [
        { id: 0, prqkor: '', name: '', profile_photo: '', bio: '', followers: 0, following: 0 },
    ];

    mostCommentsProfiles: allProfiles[] = [
        { id: 0, prqkor: '', name: '', profile_photo: '', bio: '', followers: 0, following: 0 },
    ];

    theCategorie: string = 'All'
    isPosts: boolean = false;

    theProfileCategorie: string = 'All'

    constructor(private globalVars: GlobalVars, private loaderService: LoadingService) { }

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
            body: JSON.stringify({ categorie })
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

    getAllProfiles() {
        const apiUrl = this.globalVars.apiUrl + '/getAllProfiles';

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
                this.allProfiles = data;
                this.recentProfiles = this.allProfiles.slice();
                this.popularProfiles = this.allProfiles.slice();
                this.mostFollowingProfiles = this.allProfiles.slice();
                this.mostFollowersProfiles = this.allProfiles.slice()


                this.recentProfiles.sort((a, b) => b.id - a.id);
                this.popularProfiles.sort((a, b) => b.followers - a.followers);
                this.mostFollowersProfiles.sort((a, b) => b.followers - a.followers);
                this.mostFollowingProfiles.sort((a, b) => b.following - a.following);

                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 800);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getMostPostsProfiles() {
        const apiUrl = this.globalVars.apiUrl + '/getMostPostsProfile';

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
                this.mostPostsProfiles = data

                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 800);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getMostLikesProfiles() {
        const apiUrl = this.globalVars.apiUrl + '/getMostLikesProfile';

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
                this.mostLikesProfiles = data

                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 800);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getMostFavoritesProfiles() {
        const apiUrl = this.globalVars.apiUrl + '/getMostFavoritesProfile';

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
                this.mostFavoritesProfiles = data

                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 800);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getMostCommentsProfiles() {
        const apiUrl = this.globalVars.apiUrl + '/getMostCommentsProfile';

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
                this.mostCommentsProfiles = data

                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 800);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getSearchedPosts(caption: string) {
        const apiUrl = this.globalVars.apiUrl + '/getMostCommentsProfile';

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
                this.searchedPosts = data

                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 800);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


}