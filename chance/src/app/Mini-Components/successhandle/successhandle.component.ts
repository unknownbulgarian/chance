import { Component, NgModule } from "@angular/core";
import { ErrorSuccessService } from "src/app/Services/error-success.service";


@Component({
    selector: 'app-success',
    templateUrl: './successhandle.component.html',
    styleUrls: ['./successhandle.component.scss'],
})

export class SuccessHandleComponent {

    constructor(public errorSuccessService: ErrorSuccessService) { }



}