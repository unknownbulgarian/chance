import { Component, Input, OnInit } from "@angular/core";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { SettingsService } from "src/app/Services/settings.service";

@Component({
    selector: 'app-box-method',
    templateUrl: './boxcomponent.component.html',
    styleUrls: ['./boxcomponent.component.scss'],
})

export class BoxMethodComponent {

    constructor(public settingsService: SettingsService, public errorSuccessService : ErrorSuccessService) {}

    @Input() isIcon: boolean = false;
    @Input() icon : string = ''

    soon() {
        this.errorSuccessService.setError('Not available at the moment')
        this.errorSuccessService.enableError()
    }

}