 
import { Injectable } from '@angular/core';
@Injectable()

export class LogService {
    log(msg: string) {
        console.log(new Date() + ": " + JSON.stringify(msg));
    }
}