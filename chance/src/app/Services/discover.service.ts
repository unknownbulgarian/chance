import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { LoadingService } from "./loading.service";
import { Router } from "@angular/router";
import { NavBarService } from "./navbar.service";
import { Observable, of } from 'rxjs';

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

    searchedProfiles: allProfiles[] = [
        { id: 0, prqkor: '', name: '', profile_photo: '', bio: '', followers: 0, following: 0 },
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

    constructor(private navBarService: NavBarService, private router: Router, private globalVars: GlobalVars, private loaderService: LoadingService) { }

    theCategorie: string = 'All'
    isPosts: boolean = true;

    theProfileCategorie: string = 'All'

    currentPage = 1;
    pageSize = 15;
    updatePage: boolean = false


    randomizePosts(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    setDefaultPage() {
        this.pageSize = 15;
    }


    updatePostPage() {
        this.updatePage = true
        this.pageSize = this.pageSize + 15;
        this.getCategoriePosts(this.theCategorie)
    }


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
                this.allPosts = this.randomizePosts(data)

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

        this.navBarService.isSearch = false;
        if (this.updatePage === false) {
            this.loaderService.miniLoadedSubject.next(0);
        }

        const requestData = {
            categorie,
            currentPage: this.currentPage,
            pageSize: this.pageSize
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    this.updatePage = false
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.categoriePosts = this.randomizePosts(data);

                this.updatePage = false

                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100);
                }, 800);
            })
            .catch(error => {
                this.updatePage = false
                console.error('Error:', error);
            });

    }

    getAllProfiles() {
        const apiUrl = this.globalVars.apiUrl + '/getAllProfiles';
        this.navBarService.isAccountSearch = false

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
                this.allProfiles = this.randomizePosts(data);
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
        this.navBarService.isAccountSearch = false
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
        this.navBarService.isAccountSearch = false
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
        this.navBarService.isAccountSearch = false
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
        this.navBarService.isAccountSearch = false
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
        const apiUrl = this.globalVars.apiUrl + '/getSearchedPosts';

        if (caption === '') {
            this.navBarService.isSearch = false
            this.navBarService.searchString = ''
            this.getAllPosts()
            this.getCategoriePosts('All')
        } else {
            this.loaderService.miniLoadedSubject.next(0)

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ caption })
            })
                .then(response => {
                    if (!response.ok) {

                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.router.navigate(['/discover'])
                    this.categoriePosts = []

                    this.mostFavoritesProfiles = []
                    this.mostFollowersProfiles = []
                    this.recentProfiles = []
                    this.allProfiles = []
                    this.popularProfiles = []
                    this.mostFollowersProfiles = []
                    this.mostPostsProfiles = []
                    this.mostLikesProfiles = []
                    this.mostCommentsProfiles = []
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

    getSearchedProfiles(username: string) {
        const apiUrl = this.globalVars.apiUrl + '/getSearchedProfiles';
        this.searchedProfiles = []
        if (username === '') {

            this.navBarService.isAccountSearch = false
            this.navBarService.searchString = ''
            this.getAllProfiles()
        } else {
            this.loaderService.miniLoadedSubject.next(0)

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username })
            })
                .then(response => {
                    if (!response.ok) {

                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.isPosts = false;
                    this.router.navigate(['/discover'])

                    this.searchedProfiles = data

                    setTimeout(() => {
                        this.loaderService.miniLoadedSubject.next(100)
                    }, 800);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }



}