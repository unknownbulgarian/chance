import { Component, ElementRef, NgModule, OnInit, Renderer2 } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/Services/session.service";
import { ParticlesConfig } from "src/app/utils/particles";
import { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from "tsparticles-slim"; 
import { LoadingService } from "src/app/Services/loading.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { SettingsService } from "src/app/Services/settings.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-account',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

   constructor(public title : Title, public errorSuccessService : ErrorSuccessService, public settingsService : SettingsService, public navBarService : NavBarService, public loaderService : LoadingService, public particlesConfig: ParticlesConfig,private renderer: Renderer2, private element: ElementRef, public loginService: LoginService, public router : Router, public sessionService : SessionService) {}

   isFaq : number = 0;


   ngOnInit(): void {

    this.title.setTitle('Chance - Share your art')
       
    this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');  
    this.loaderService.miniLoadedSubject.next(100)
   }

   ngOnDestroy(): void {
  //  this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow', 'hidden');  
    
   }
 

   scrollTo(x : number, y : number) {
    window.scroll(x,y)
   }

   particlesLoaded(container: Container): void {
  }

  async particlesInit(engine: Engine): Promise<void> {

    await loadSlim(engine);
  }
    
   

   

}