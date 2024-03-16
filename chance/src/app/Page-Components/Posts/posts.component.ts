import { Component, ElementRef, NgModule, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { GetPostInfoService } from "src/app/Services/getPost-Info.service";
import { GlobalVars } from "src/app/utils/global";


@Component({
    selector: 'app-upload',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
})

export class PostsComponent implements OnInit {

    constructor(public userInfoService : UserInfoService, public globalVars: GlobalVars, private route : ActivatedRoute, public getPostInfoService: GetPostInfoService) { }

    isComments: boolean = true;

    postId = this.route.snapshot.paramMap.get('id')

    ngOnInit(): void {
        window.scroll(0, 0)
        this.getPostInfoService.getnfo(this.postId)
    }







}