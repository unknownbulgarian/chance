import { Component, Input, OnInit } from "@angular/core";
import { SettingsService } from "src/app/Services/settings.service";

@Component({
    selector: 'app-box-method',
    templateUrl: './boxcomponent.component.html',
    styleUrls: ['./boxcomponent.component.scss'],
})

export class BoxMethodComponent {

    constructor(public settingsService: SettingsService) {}

    @Input() isIcon: boolean = false;
    @Input() isCustom : boolean = false;
    @Input() src: string = ''

}