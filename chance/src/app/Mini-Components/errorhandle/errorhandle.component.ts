import { Component, NgModule } from "@angular/core";
import { ErrorSuccessService } from "src/app/Services/error-success.service";


@Component({
    selector: 'app-error',
    templateUrl: './errorhandle.component.html',
    styleUrls: ['./errorhandle.component.scss'],
})

export class ErrorHandleComponent {

    constructor(public errorSuccessService: ErrorSuccessService) { }

}