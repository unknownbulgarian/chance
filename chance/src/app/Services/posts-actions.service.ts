import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { GetPostInfoService } from "./getPost-Info.service";
import { LoginService } from "./login.service";
import { SessionService } from "./session.service";


@Injectable()
export class PostsActionService {


    constructor(private loginService: LoginService, private sessionService: SessionService, private globalVars: GlobalVars, private getPostInfoService: GetPostInfoService) { }

    comment: string = ''

    likePost(id: string | null) {

        if (!this.sessionService.session) {
      
        } else {
            const apiUrl = this.globalVars.apiUrl + '/likePost';

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
                    this.getPostInfoService.getnfo(id)
                })
                .catch(error => {

                });

        }
    }



    favoritedPost(id: string | null) {

        if (!this.sessionService.session) {
        
        } else {
            const apiUrl = this.globalVars.apiUrl + '/favoritedPost';

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
                    this.getPostInfoService.getActionInfo()
                    this.getPostInfoService.getnfo(id)
                })
                .catch(error => {

                });
        }

    }


    postComment(id: string | null) {

        if (!this.sessionService.session) {
          
        } else {
            const apiUrl = this.globalVars.apiUrl + '/postComment';

            fetch(apiUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, comment: this.comment }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.getPostInfoService.getComments(id)
                    this.getPostInfoService.getnfo(id)
                })
                .catch(error => {

                });
        }
    }




}