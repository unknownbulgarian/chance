import { Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { GetPostInfoService } from "src/app/Services/getPost-Info.service";
import { LoadingService } from "src/app/Services/loading.service";
import { LoginService } from "src/app/Services/login.service";
import { PostsActionService } from "src/app/Services/posts-actions.service";
import { SessionService } from "src/app/Services/session.service";
import { GlobalVars } from "src/app/utils/global";


@Component({
    selector: 'app-upload',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
})

export class PostsComponent implements OnInit {

    @ViewChild('comment') commentInput!: ElementRef<HTMLInputElement>;

    constructor(public loaderService : LoadingService, public sessionService: SessionService, public loginService : LoginService, public router : Router, public postsActionService: PostsActionService, public userInfoService: UserInfoService, public globalVars: GlobalVars, private route: ActivatedRoute, public getPostInfoService: GetPostInfoService) { }

    isComments: boolean = true;

    postId = this.route.snapshot.paramMap.get('id')

    ngOnInit(): void {

        window.scroll(0, 0)
        this.getPostInfoService.getnfo(this.postId)
    }

    getComment(comment: string) {
        this.postsActionService.comment = comment
    }

    postComment() {
        this.postsActionService.postComment(this.postId)
    }

    clearInput(commentInput: HTMLInputElement) {
        commentInput.value = '';
      }
    

    ngAfterContentChecked(): void {
        this.postId = this.route.snapshot.paramMap.get('id')
    }







}