import { Injectable } from '@angular/core';

import {Subject} from 'rxjs'
import { Collection_Item } from '@app/classes/collections';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  public collections: Subject<Array<Collection_Item>>
  private socket:WebSocket;
  private response;
  private collection_items = []
  

  constructor() {
    this.collections = new Subject<Array<Collection_Item>>()
    this.socket = new WebSocket("ws://" + window.location.hostname + ":3000");
    this.socket.onmessage = ((event) => {  
      this.response = JSON.parse(event.data);
      this.response.message.forEach((element)=>{
        this.addData(element.data.key,element.data.name,element.data.parentCollection)
        this.collections.next(this.collection_items)
      })
    })

   }

  addData(key:string,name:string,parentCollection:string){
    let array = []
    this.collection_items.push(new Collection_Item (key,name,parentCollection))
  }
}