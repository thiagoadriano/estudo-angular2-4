import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
    confirm(message?:string):Promise<any>{
        return new Promise(resolve => {
            return resolve(window.confirm(message || "Confirmar?"))
        })
    }
}