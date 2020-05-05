import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class LoggingService{
    lastLog: string;

    printLog(message: string){
        console.log(message);
        console.log('Old last log: ' + this.lastLog);
        this.lastLog = message;
    }
}
