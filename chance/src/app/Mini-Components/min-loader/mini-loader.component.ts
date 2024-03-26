import { Component, NgModule, OnInit } from "@angular/core";
import { LoadingService } from "src/app/Services/loading.service";
import { SettingsService } from "src/app/Services/settings.service";


@Component({
    selector: 'app-mini-loading',
    templateUrl: './mini-loader.component.html',
    styleUrls: ['./mini-loader.component.scss'],
})

export class MiniLoaderComponent {

    constructor(public loadingService: LoadingService, public settingsService : SettingsService) { }

}
