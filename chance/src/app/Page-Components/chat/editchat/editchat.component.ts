import { Component } from "@angular/core";
import { ChatService } from "src/app/Services/chat.service";


@Component({
    selector: 'app-edit-chat',
    templateUrl: './editchat.component.html',
    styleUrls: ['./editchat.component.scss'],
})

export class EditChatComponent{

    isSetting : number = 1;


    constructor(public chatService: ChatService) { }

  
 





}