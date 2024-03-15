import { Component, ElementRef, NgModule, OnInit, Renderer2 } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/Services/session.service";

@Component({
    selector: 'app-account',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

   constructor(private renderer: Renderer2, private element: ElementRef, public loginService: LoginService, public router : Router, public sessionService : SessionService) {}

   isFaq : number = 0;


   ngOnInit(): void {
       
    this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow', 'visible');  
   }
 

   scrollTo(x : number, y : number) {
    window.scroll(x,y)
   }
    
   

   

}