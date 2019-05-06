import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
  // private url = `http://${window.location.hostname}:3001`;
  private url = `http://0.0.0.0:3001`;
  private socket;

  constructor() {}

  connect() {
    this.socket = io.connect(this.url);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  onMessage() {
    return Observable.create(observer => {
      this.socket.on('message', res => {
        observer.next(res);
      });
    });
  }

  subscribe(room) {
    this.socket.emit('subscribe', room);
  }

  unsubscribe(room) {
    this.socket.emit('unsubscribe', room);
  }

}
