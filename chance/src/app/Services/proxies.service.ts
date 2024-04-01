import { Injectable } from "@angular/core";
import { GlobalVars } from "../utils/global";



@Injectable()
export class ProxyService {

    constructor(private globalVars : GlobalVars) {}

    proxyCheck(): void {


        fetch(this.globalVars.apiUrl + '/proxyCheck', {
            method: 'POST',
         
        })
            .then(response => response.json())
            .then(data => {
           
          
            })
            .catch(error => {
              
            });
    }

}