import { Injectable } from "@angular/core";


@Injectable()
export class GlobalVars{
    frontEndUrl: string = 'https://chance-now.vercel.app'
    apiUrl : string = 'https://a1f9-77-64-210-32.ngrok-free.app'

    photosUrl : string = this.apiUrl + '/profile_photos/'
    compressedPhotosUrl : string = this.apiUrl + '/compressed_images_profiles/'
    compressedProfilePhotos : string = this.apiUrl + '/view_profile_profile_photos/'

    postsUrl : string = this.apiUrl + '/posts/'
    compressedPostsUrl : string = this.apiUrl + '/compressed_images_posts/'
    compressedProfilePosts : string = this.apiUrl + '/view_profile_posts/'
}