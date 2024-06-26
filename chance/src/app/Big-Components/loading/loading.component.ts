import { Component, NgModule, OnInit } from "@angular/core";
import { LoadingService } from "src/app/Services/loading.service";
import { SettingsService } from "src/app/Services/settings.service";


@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})

export class LoaderComponent {

    constructor(public loadingService: LoadingService, public settingsService : SettingsService) { }

}
