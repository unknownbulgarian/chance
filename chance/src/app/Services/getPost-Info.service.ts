import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { LoadingService } from "./loading.service";

interface postInfo {
    caption: string
    id: number
    image: string
    likes: number
    comments: number
    favorites: number
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
    id: string
    comment: string
    timestamp: string
    prqkor: string
    name: string
    profile_photo: string
}


@Injectable()
export class GetPostInfoService {

    postInfo: postInfo;
    userInfo: userInfo;
    actionInfo: actionInfo

    posts: userPosts[] = [
        { id: '', image: '' },
    ];

    postComments: comments[] = [
        { id: '', profile_photo: '', comment: '', timestamp: '', prqkor: '', name: '' },
    ];

    isPostLiked: boolean = false
    isFavorited: boolean = false





    constructor(private globalVars: GlobalVars, private loaderService: LoadingService) {
        this.postInfo = {
            caption: '',
            id: 0,
            image: '',
            likes: 0,
            comments: 0,
            favorites: 0
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

        this.postComments = []

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
                console.log(data)
                this.postInfo = data
                this.userInfo = data.user
                this.getIfLike(id)
                this.getIfFavorited(id)
                this.getUserPosts(this.userInfo.id)
                this.getComments(id)

            })
            .catch(error => {
                //  console.error('Error:', error);
            });
    }

    getActionInfo() {
        const apiUrl = this.globalVars.apiUrl + '/getUserPostsInfo';

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
                this.actionInfo = data.userPostsInfo
                console.log(data)
            })
            .catch(error => {
                //    console.error('Error:', error);
            });
    }

    getIfLike(id: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/checkLikedPost';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
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
            credentials: 'include',
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
            credentials: 'include',
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
            credentials: 'include',
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
                this.postComments = data
                this.postComments.sort((a, b) => Number(b.id) - Number(a.id));
            })
            .catch(error => {
                //    console.error('Error:', error);
            });
    }


}