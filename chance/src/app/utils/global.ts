import { Injectable } from "@angular/core";


@Injectable()
export class GlobalVars{
    apiUrl : string = 'https://a1f9-77-64-210-32.ngrok-free.app'
    photosUrl : string = this.apiUrl + '/profile_photos/'
    postsUrl : string = this.apiUrl + '/posts/'
}