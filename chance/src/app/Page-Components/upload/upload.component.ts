import { Component, ElementRef, NgModule, OnInit, Renderer2 } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/Services/session.service";
import { ParticlesConfig } from "src/app/utils/particles";
import { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from "tsparticles-slim";
import { UploadService } from "src/app/Services/upload.service";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})

export class UploadComponent implements OnInit {

    constructor(public particlesConfig: ParticlesConfig, private renderer: Renderer2, private element: ElementRef, 
        public loginService: LoginService, public router: Router, public sessionService: SessionService, public uploadService: UploadService) { }


    isComment : boolean = true;
    isLike : boolean = true;

    textareaHeight: number = 25;
    setHeight: string = this.textareaHeight + 'px'


    ngOnInit(): void {
        window.scroll(0, 0)
    }


    saveCaption(caption : string) {
          this.uploadService.userData.caption = caption
          console.log(caption)
    }

    ImageUpload(event: any) {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          this.uploadService.userData.image = file;
        }
      }


    autoExpand(textarea: HTMLTextAreaElement, event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            if (this.textareaHeight < 200) {
                this.setHeight = textarea.scrollHeight + 'px';
                this.textareaHeight = parseInt(textarea.style.height)
            } 
        } else if (event.key === 'Backspace') {
            if (this.textareaHeight !== 25) {
                    this.textareaHeight = parseInt(textarea.style.height) - 15
                    this.setHeight = parseInt(textarea.style.height) - 15 + 'px';
            }
        }
    }



    particlesLoaded(container: Container): void {
        console.log(container);
    }

    async particlesInit(engine: Engine): Promise<void> {
        console.log(engine);

        await loadSlim(engine);
    }







}