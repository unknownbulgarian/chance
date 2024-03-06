import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";


@Injectable()
export class Killer{

    constructor(private globalVars: GlobalVars) {}


    KillSession() {
        const apiUrl = this.globalVars.apiUrl + '/viewProfile';

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
         
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
             
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}