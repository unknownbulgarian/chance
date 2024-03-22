import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { GetPostInfoService } from "./getPost-Info.service";
import { LoginService } from "./login.service";
import { SessionService } from "./session.service";
import { Router } from "@angular/router";
import { ErrorSuccessService } from "./error-success.service";
import { UserInfoService } from "./get-userinfo.service";


@Injectable()
export class PostsActionService {


    constructor(private errorSuccessService: ErrorSuccessService, private router: Router, private loginService: LoginService, private sessionService: SessionService, private globalVars: GlobalVars, private getPostInfoService: GetPostInfoService,
        private userInfoService: UserInfoService) { }

    comment: string = ''

    likePost(id: string | null, toUser: string, postId: string | null) {

        if (!this.sessionService.session) {

        } else {
            const apiUrl = this.globalVars.apiUrl + '/likePost';

            fetch(apiUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, toUser, postId }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.getPostInfoService.getnfo(id)
                })
                .catch(error => {

                });

        }
    }

    favoritedPost(id: string | null, toUser: string, postId: string | null) {

        if (!this.sessionService.session) {

        } else {
            const apiUrl = this.globalVars.apiUrl + '/favoritedPost';

            fetch(apiUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, toUser, postId }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {

                    this.getPostInfoService.getnfo(id)
                })
                .catch(error => {

                });
        }

    }

    postComment(id: string | null, toUser: string) {

        if (!this.sessionService.session) {

        } else {
            const apiUrl = this.globalVars.apiUrl + '/postComment';

            fetch(apiUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, comment: this.comment, toUser }),
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        this.errorSuccessService.setError(data.error)
                        this.errorSuccessService.enableError()
                    } else {
                        this.getPostInfoService.getComments(id)
                        this.getPostInfoService.getnfo(id)
                        this.errorSuccessService.disableBoth()
                    }
                })
                .catch(error => {
                    this.errorSuccessService.setError(error)
                    this.errorSuccessService.enableError()
                });
        }
    }

    deletePost(id: string | null) {
        if (!this.sessionService.session) {

        } else {
            const apiUrl = this.globalVars.apiUrl + '/deletePost';

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
                        this.errorSuccessService.setError('Something went wrong')
                        this.errorSuccessService.enableErrorTime(1000)
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.router.navigate(['/profile'])
                })
                .catch(error => {
                    this.errorSuccessService.setError('Something went wrong')
                    this.errorSuccessService.enableErrorTime(1000)
                });
        }
    }

    deleteCommentsAll(id: number | null, postId: string | null) {

        const apiUrl = this.globalVars.apiUrl + '/deleteCommentsAll';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, postId }),
        })
            .then(response => {
                if (!response.ok) {
                    this.errorSuccessService.setError('Something went wrong')
                    this.errorSuccessService.enableErrorTime(1000)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.getPostInfoService.getnfo(postId)
            })
            .catch(error => {
                this.errorSuccessService.setError('Something went wrong')
                this.errorSuccessService.enableErrorTime(1000)
            });
    }

    deleteOwnComment(id: number, postId: string | null) {
        const apiUrl = this.globalVars.apiUrl + '/deleteOwnComment';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, postId }),
        })
            .then(response => {
                if (!response.ok) {
                    this.errorSuccessService.setError('Something went wrong')
                    this.errorSuccessService.enableErrorTime(1000)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.getPostInfoService.getnfo(postId)
            })
            .catch(error => {
                this.errorSuccessService.setError('Something went wrong')
                this.errorSuccessService.enableErrorTime(1000)
            });
    }

    editCaption(id: string | null, caption: string) {
        if (!this.sessionService.session) {

        } else {
            const apiUrl = this.globalVars.apiUrl + '/editPostCaption';

            fetch(apiUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, caption }),
            })
                .then(response => {
                    if (!response.ok) {
                        this.errorSuccessService.setError('Something went wrong')
                        this.errorSuccessService.enableErrorTime(1000)
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.errorSuccessService.setSuccess('Successfully changed the caption')
                    this.errorSuccessService.enableSuccessTime(1200)
                    setTimeout(() => {
                        this.getPostInfoService.getnfo(id)
                    }, 1300);
                })
                .catch(async error => {
                    console.error('Error:', error);
                    this.errorSuccessService.setError('Something went wrong');
                });
        }
    }

    increaseView(id: string | null) {
        if (!this.sessionService.session) {

        } else {
            const apiUrl = this.globalVars.apiUrl + '/increaseView';
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

                })
                .catch(async error => {
                    console.error('Error:', error);
                });
        }

    }

    increaseDownload(id: string | null, toUser: string) {
        const apiUrl = this.globalVars.apiUrl + '/downloadPost';

        fetch(apiUrl, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, toUser }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                // this.getPostInfoService.getnfo(id)
            })
            .catch(error => {

            });
    }

    likeComment(id: number | null, postId: string | null, toUser: number) {
        if (!this.sessionService.session) {

        } else {
            const apiUrl = this.globalVars.apiUrl + '/likeComment';

            fetch(apiUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, postId, toUser }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.getPostInfoService.getnfo(postId)
                })
                .catch(error => {

                });
        }
    }
}