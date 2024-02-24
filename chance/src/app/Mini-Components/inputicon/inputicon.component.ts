import { Component, ElementRef, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-input-icon',
    templateUrl: './inputicon.component.html',
    styleUrls: ['./inputicon.component.scss'],
})

export class InputIconComponent {

    @Input() type: string = ''
    @Input() placeholder: string = ''
    @Input() icon: string = ''

}