import { Component, OnInit } from '@angular/core';
import { BlankService } from 'src/app/Services/blank.service';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
})
export class BlankComponent {
  constructor(public blankService: BlankService) { }

   


}
