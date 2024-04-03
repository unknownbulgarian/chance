import { Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { GetPostInfoService } from "src/app/Services/getPost-Info.service";
import { LoadingService } from "src/app/Services/loading.service";
import { LoginService } from "src/app/Services/login.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { PostsActionService } from "src/app/Services/posts-actions.service";
import { ProfilesService } from "src/app/Services/profiles.service";
import { SessionService } from "src/app/Services/session.service";
import { SettingsService } from "src/app/Services/settings.service";
import { ViewProfileService } from "src/app/Services/view-profile.service";
import { GlobalVars } from "src/app/utils/global";
import { ParticlesConfig } from "src/app/utils/particles";
import { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";


@Component({
    selector: 'app-upload',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
})


export class PostsComponent implements OnInit {

    @ViewChild('comment') commentInput!: ElementRef<HTMLInputElement>;
    @ViewChild('captiontext') captiontext!: ElementRef;
    @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;

    constructor(public title : Title, public settingsService: SettingsService, public particlesConfig: ParticlesConfig, public profilesService: ProfilesService,
        public viewProfileService: ViewProfileService, public loaderService: LoadingService,
        public sessionService: SessionService, public loginService: LoginService, public router: Router,
        public postsActionService: PostsActionService, public userInfoService: UserInfoService, public globalVars: GlobalVars,
        private route: ActivatedRoute, public getPostInfoService: GetPostInfoService, private errorSuccessService: ErrorSuccessService, public navBarService: NavBarService) { }


    isEditable = false;

    isComments: boolean = true;

    postId = this.route.snapshot.paramMap.get('id')

    shareLink = this.globalVars.frontEndUrl + '/posts/' + this.postId

    copyLink(): void {
        const shareLinkElement = document.querySelector('.share-link p');

        if (shareLinkElement) {

            const textToCopy = shareLinkElement.textContent;

            const tempTextarea = document.createElement('textarea');

            tempTextarea.value = textToCopy ? textToCopy.trim() : '';

            document.body.appendChild(tempTextarea);

            tempTextarea.select();

            document.execCommand('copy');

            document.body.removeChild(tempTextarea);
        } else {
            //   console.error('Share link element not found');
        }
    }



    ngOnInit(): void {

        

        this.getPostInfoService.getRecentPosts()

        window.scroll(0, 0)
        this.getPostInfoService.getnfo(this.postId)

        this.postsActionService.increaseView(this.postId)

        this.title.setTitle('Chance - Post ' + this.postId)
    }

    getComment(comment: string) {
        this.postsActionService.comment = comment
    }

    postComment() {
        this.postsActionService.postComment(this.postId, this.getPostInfoService.userInfo.id)
    }

    deletePost() {
        if (this.userInfoService.userData.prqkor === this.getPostInfoService.userInfo.prqkor) {
            this.postsActionService.deletePost(this.postId)
        } else {
            this.router.navigate(['/profiles/' + this.getPostInfoService.userInfo.prqkor]);
            this.viewProfileService.view();
            this.userInfoService.getPublicUserData(this.getPostInfoService.userInfo.prqkor);
            this.profilesService.checkIfFollow(this.getPostInfoService.userInfo.prqkor)
        }
    }

    clearInput(commentInput: HTMLInputElement) {
        commentInput.value = '';
    }

    scrollTop() {
        window.scroll(0, 0)
    }

    startEditing(): void {
        this.isEditable = true;
        setTimeout(() => {
            this.captiontext.nativeElement.focus();
        });
    }

    onEnter(event: Event): void {
        const keyboardEvent = event as KeyboardEvent;

        if (keyboardEvent.key === 'Enter') {
            this.isEditable = false;
            const captionText = this.captiontext.nativeElement.textContent.trim();
            if (captionText === '') {
                this.errorSuccessService.enableError();
                this.errorSuccessService.setError('Caption cannot be empty');
                this.captiontext.nativeElement.innerText = this.getPostInfoService.postInfo.caption
            }
            if (captionText.length > 60) {
                this.errorSuccessService.enableError();
                this.errorSuccessService.setError('Caption cannot be more than 60 characters long');
                this.captiontext.nativeElement.innerText = this.getPostInfoService.postInfo.caption
            }
            if (!this.errorSuccessService.error) {
                this.postsActionService.editCaption(this.postId, this.captiontext.nativeElement.innerText)
            }
        }
    }

    onBlur(): void {
        this.isEditable = false;
        const captionText = this.captiontext.nativeElement.textContent.trim();

        if (captionText === '') {
            this.errorSuccessService.enableError();
            this.errorSuccessService.setError('Caption cannot be empty');
            this.captiontext.nativeElement.innerText = this.getPostInfoService.postInfo.caption
        }
        if (captionText.length > 60) {
            this.errorSuccessService.enableError();
            this.errorSuccessService.setError('Caption cannot be more than 60 characters long');
            this.captiontext.nativeElement.innerText = this.getPostInfoService.postInfo.caption
        }
        if (!this.errorSuccessService.error) {
            this.postsActionService.editCaption(this.postId, this.captiontext.nativeElement.innerText)
        }
    }



    ngAfterContentChecked(): void {
        this.postId = this.route.snapshot.paramMap.get('id')
        this.shareLink = this.globalVars.frontEndUrl + '/posts/' + this.postId

    }

    particlesLoaded(container: Container): void {
    }

    async particlesInit(engine: Engine): Promise<void> {

        await loadSlim(engine);
    }






}