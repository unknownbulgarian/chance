import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { LoadingService } from "./loading.service";
import { ErrorSuccessService } from "./error-success.service";
import { SessionService } from "./session.service";

interface postInfo {
    caption: string
    id: string
    image: string
    likes: number
    comments: number
    favorites: number
    views: number
    downloads: number
}

interface userInfo {
    id: string
    prqkor: string
    name: string
    bio: string
    profile_photo: string
}

interface actionInfo {
    post: number
    liked: number
    favorited: number
}

interface userPosts {
    id: string
    image: string
}

interface comments {
    id: number
    comment: string
    timestamp: string
    likes: number
    poster_id: number;
    prqkor: string
    name: string
    profile_photo: string
}

interface likedComments {
    id: number
}


@Injectable()
export class GetPostInfoService {

    postInfo: postInfo;
    userInfo: userInfo;
    actionInfo: actionInfo


    posts: userPosts[] = [
        { id: '', image: '' },
    ];

    releatedPosts: userPosts[] = [
        { id: '', image: '' },
    ];

    recentPosts: userPosts[] = [
        { id: '', image: '' },
    ];


    postComments: comments[] = [
        { id: 0, profile_photo: '', comment: '', timestamp: '', poster_id: 0, prqkor: '', name: '', likes: 0 },
    ];

    likedComments: number[] = [];


    isPostLiked: boolean = false
    isFavorited: boolean = false

    notfound: boolean = false

    constructor(private globalVars: GlobalVars, private loaderService: LoadingService, private errorSuccessService : ErrorSuccessService, private sessionService : SessionService) {
        this.postInfo = {
            caption: '',
            id: '',
            image: '',
            likes: 0,
            comments: 0,
            favorites: 0,
            views: 0,
            downloads: 0
        }

        this.userInfo = {
            id: '',
            prqkor: '',
            name: '',
            bio: '',
            profile_photo: '',
        }

        this.actionInfo = {
            post: 0,
            liked: 0,
            favorited: 0,
        }
    }

    getnfo(id: string | null) {
        this.errorSuccessService.disableBoth()
        this.loaderService.miniLoadedSubject.next(4)

        this.postComments = []
        this.releatedPosts = []


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
                    this.notfound = true
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();

            })
            .then(data => {
                this.notfound = false
                this.postInfo = data
                this.userInfo = data.user
                this.getIfLike(id)
                this.getIfFavorited(id)
                this.getUserPosts(this.userInfo.id)
                this.getComments(id)
                this.getLikedComments()
                this.getRelatedPosts(this.postInfo.caption)


                setTimeout(() => {
                    this.loaderService.miniLoadedSubject.next(100)
                }, 600);

            })
            .catch(error => {
                this.notfound = true
            });
    }



    getIfLike(id: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/checkLikedPost';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, tokenCookie: this.sessionService.getToken() }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.isPostLiked = data.liked
            })
            .catch(error => {
                //     console.error('Error:', error);
            });
    }

    getIfFavorited(id: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/checkFavoritedPost';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, tokenCookie: this.sessionService.getToken() }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.isFavorited = data.favorited
            })
            .catch(error => {
                //    console.error('Error:', error);
            });
    }

    getUserPosts(id: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/getUserPostsId';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, tokenCookie: this.sessionService.getToken() }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.posts = data.userPosts
                this.posts.sort((a, b) => Number(b.id) - Number(a.id));
            })
            .catch(error => {
                //   console.error('Error:', error);
            });
    }

    getComments(id: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/getComments';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, tokenCookie: this.sessionService.getToken() }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.postComments = data
                this.postComments.sort((a, b) => Number(b.id) - Number(a.id));
            })
            .catch(error => {
                //    console.error('Error:', error);
            });
    }

    getLikedComments() {
        const apiUrl = this.globalVars.apiUrl + '/getLikedComments';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tokenCookie: this.sessionService.getToken()})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.likedCommentIds && Array.isArray(data.likedCommentIds)) {
                    this.likedComments = data.likedCommentIds;
                } else {
                    console.error('Invalid data format for liked comments:', data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getRecentPosts() {
        const apiUrl = this.globalVars.apiUrl + '/getRecentPosts';

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
                this.recentPosts = data
                this.recentPosts.sort((a, b) => Number(b.id) - Number(a.id));
            })
            .catch(error => {
                //    console.error('Error:', error);
            });
    }

    getRelatedPosts(caption : string) {
        const apiUrl = this.globalVars.apiUrl + '/getRelatedPosts';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({caption})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.releatedPosts = data
                this.releatedPosts.sort((a, b) => Number(b.id) - Number(a.id));
            })
            .catch(error => {
                //    console.error('Error:', error);
            });
    }



}



