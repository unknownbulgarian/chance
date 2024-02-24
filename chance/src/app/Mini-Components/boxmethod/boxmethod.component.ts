import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-box-method',
    templateUrl: './boxcomponent.component.html',
    styleUrls: ['./boxcomponent.component.scss'],
})

export class BoxMethodComponent {

    @Input() isIcon: boolean = false;
    @Input() isCustom : boolean = false;
    @Input() src: string = ''

}