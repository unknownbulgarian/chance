import { Injectable } from "@angular/core";


@Injectable()
export class GlobalVars{
    apiUrl : string = 'http://localhost:3001'
    photosUrl : string = 'http://localhost:3001/profile_photos/'
}