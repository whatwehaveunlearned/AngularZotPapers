import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    public socket:WebSocket;
    private response;

  constructor() {
    this.socket = new WebSocket("ws://" + window.location.hostname + ":3000");
   }

  send_msg(){

  }

  recieve_msg(event){
    this.response = JSON.parse(event.data);
    return this.response;
  }
}
