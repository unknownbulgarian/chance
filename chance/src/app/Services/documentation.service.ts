import { Injectable } from "@angular/core";
import { ErrorSuccessService } from "./error-success.service";

interface searchList {
    question: string
    type: string
}

interface searchedList {
    question: string
    type: string
}

@Injectable()
export class DocumentationService {

    constructor(private errorSuccessService : ErrorSuccessService) {}

    list: searchList[] = [
        { question: 'How to create an account?', type: 'createaccount' },
        { question: 'How is our algorithm working?', type: 'background' },
        { question: 'How can I go viral?', type: 'firststeps' },
        { question: 'Can I earn money?', type: 'requirements' },
        { question: 'How to upload a video?', type: 'uploadapost' },
        { question: 'How can I chat with someone?', type: 'chatwithstrangers' },
        { question: 'Is there an API?', type: 'howitworks' },
        { question: 'What is Chance?', type: 'whatischance' }
    ]

    searchedList: searchList[] = []


    //default
    isIntro: boolean = true

    isStarted: boolean = false
    isAlgo: boolean = false
    isCreator: boolean = false
    isTutorial: boolean = false
    isUpdate: boolean = false
    isAPI: boolean = false

    current: string = ''



    setCurrent(name: string) {
        this.current = name
    }

    clearCurrent() {
        this.current = ''
    }

    search(query: string) {
        this.searchedList = this.list.filter(item =>
            item.question.toLowerCase().includes(query.toLowerCase())
        );
    }

    searchSelect() {
        if(this.searchedList.length === 0) {
            this.errorSuccessService.setError('No search results were found')
           this.errorSuccessService.enableErrorTime(1400)
        }
        if(this.searchedList.length > 0) {
            this.current = this.searchedList[0].type
        }
        switch (this.current) {
            case 'background':
            case 'firststeps':
                this.isAlgo = true
                break;
            case 'requirements':
                this.isCreator = true
                break;
            case 'uploadapost':
            case 'chatwithstrangers':
                this.isTutorial = true
                break;
            case 'howitworks':
                this.isAPI = true
                break;
            case 'whatischance':
            case 'createaccount':
                this.isStarted = true
                break;
        }
    }

}