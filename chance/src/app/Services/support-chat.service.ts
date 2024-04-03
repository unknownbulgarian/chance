import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";
import { SessionService } from "./session.service";
import { ErrorSuccessService } from "./error-success.service";


interface message {
  message: string;
}

interface messages{
  id: number;
  message: string;
  sender_id: number;
  to_id: number;
  created_at: string;
}



@Injectable()
export class SupportChatService {
  isToggled: boolean = false;

  message: message;
  messages: messages[] = [];

  constructor(private globalVars: GlobalVars, private sessionService: SessionService, private errorSuccessService: ErrorSuccessService) {
    this.message = {
      message: ''
    }

  }


  toggle() {
    this.isToggled = !this.isToggled
  }

  enable() {
    this.isToggled = true
  }

  disable() {
    this.isToggled = false
  }

  getValue() {
    return this.isToggled;
  }


  sendMessage() {
    const apiUrl = this.globalVars.apiUrl + '/messageLiveChat';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: this.message.message, tokenCookie: this.sessionService.getToken() }),
    })
      .then(response => {

        return response.json();
      })
      .then(data => {
        if (data.error) {
          this.errorSuccessService.setError(data.error)
          this.errorSuccessService.enableErrorTime(2000)
        } else {
          this.message.message = ''
          this.getMessages()
        }

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getMessages() {
    const apiUrl = this.globalVars.apiUrl + '/getLiveChat';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenCookie: this.sessionService.getToken() }),
    })
      .then(response => {

        return response.json();
      })
      .then(data => {
        if (data.error) {
          this.errorSuccessService.setError(data.error)
          this.errorSuccessService.enableErrorTime(2000)
        } else {
          this.messages = data.messages
        }

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}


