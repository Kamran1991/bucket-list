import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class DataService {
  private url = 'http://localhost:3001';
  private socket;   

  private goals = new BehaviorSubject<any>(['The initial goal','Another silly life goal']);
  goal =this.goals.asObservable();

  constructor() { 
    this.socket = io(this.url);
  }
  changeGoal(goal){
    this.socket.emit('new-message', goal[0]);
    this.goals.next(goal);
  }
  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message) => {
            observer.next(message);
        });
    });
}

}
