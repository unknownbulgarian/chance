import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-input-icon',
    templateUrl: './inputicon.component.html',
    styleUrls: ['./inputicon.component.scss'],
})

export class InputIconComponent {

    @Input() type: string = ''
    @Input() placeholder: string = ''
    @Input() icon: string = ''

    @Output() getValue = new EventEmitter<string>()

    getInputValue(val: string) {
        this.getValue.emit(val)
    }
}