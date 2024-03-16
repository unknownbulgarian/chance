import { Injectable } from "@angular/core";


@Injectable()
export class GlobalVars{
    apiUrl : string = 'http://localhost:3001'
    photosUrl : string = this.apiUrl + '/profile_photos/'
    postsUrl : string = this.apiUrl + '/posts/'
}