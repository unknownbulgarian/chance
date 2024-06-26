import { Component, ElementRef, NgModule, OnInit, Renderer2 } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/Services/session.service";
import { ParticlesConfig } from "src/app/utils/particles";
import { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from "tsparticles-slim";
import { UploadService } from "src/app/Services/upload.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { LoadingService } from "src/app/Services/loading.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { SettingsService } from "src/app/Services/settings.service";
import { Title } from "@angular/platform-browser";

interface Categories {
    title: string;
}

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})

export class UploadComponent implements OnInit {

    categories: Categories[] = [
        { title: '' },
    ];


    constructor(public title : Title, public settingsService : SettingsService, public errorSuccessService: ErrorSuccessService, public particlesConfig: ParticlesConfig, private renderer: Renderer2, private element: ElementRef,
        public loginService: LoginService, public router: Router, public sessionService: SessionService, public uploadService: UploadService, 
        public loaderService : LoadingService, public navBarService : NavBarService) { }



    isComment: boolean = true;
    isLike: boolean = true;

    textareaHeight: number = 25;
    setHeight: string = this.textareaHeight + 'px'



    ngOnInit(): void {

        this.title.setTitle('Chance - Upload your art')

        this.categories = []
        const titlesToAdd: string[] = ['Other', 'Cars', 'Games', 'Cartoons'
            , 'Space', 'Sports', 'Movies', 'Nature', 'Celebrities', 'Holidays', 'AI',
            'Superheroes'];
        this.categories.push(...titlesToAdd.map(title => ({ title: title })));
        this.uploadService.theCategorie = 'Other'
        window.scroll(0, 0)
    }



    saveCaption(caption: string) {
        this.uploadService.userData.caption = caption
    }

    ImageUpload(event: any) {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            this.uploadService.userData.image = file;

            const reader = new FileReader();
            reader.onload = () => {
                this.uploadService.currentUpload = reader.result as string; // Set the result as the currentUpload
            };
            reader.readAsDataURL(file);
        }
    }

    cancelUpload() {
        this.router.navigate(['/'])
        this.uploadService.userData.caption = ''
        this.uploadService.userData.image = '';
        this.uploadService.currentUpload = '';
    }



    autoExpand(textarea: HTMLTextAreaElement, event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.uploadService.upload()
            if (!this.errorSuccessService.error) {
                this.uploadService.userData.caption = ''
                this.uploadService.userData.image = '';
                this.uploadService.currentUpload = '';
                textarea.value = ''
            }
        }

    }

    preventEnter(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }



    particlesLoaded(container: Container): void {
    }

    async particlesInit(engine: Engine): Promise<void> {

        await loadSlim(engine);
    }







}