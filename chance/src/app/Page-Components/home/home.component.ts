import { Component, ElementRef, NgModule, OnInit, Renderer2 } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/Services/session.service";
import { ParticlesConfig } from "src/app/utils/particles";
import { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from "tsparticles-slim"; 

@Component({
    selector: 'app-account',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

   constructor(public particlesConfig: ParticlesConfig,private renderer: Renderer2, private element: ElementRef, public loginService: LoginService, public router : Router, public sessionService : SessionService) {}

   isFaq : number = 0;


   ngOnInit(): void {
       
    this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow', 'visible');  
   }

   ngOnDestroy(): void {
    this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow', 'hidden');  
    
   }
 

   scrollTo(x : number, y : number) {
    window.scroll(x,y)
   }

   particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);

    await loadSlim(engine);
  }
    
   

   

}