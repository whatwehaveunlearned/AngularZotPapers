// import { Injectable } from '@angular/core';
// import {Subject} from 'rxjs'

// import { Paper_Item } from '@app/classes/paper';
// import {CollectionsService} from '@app/services/collections.service';
// import { Collection_Item } from '@app/classes/collections';
// import { DataService } from '@app/services/data.service'

// @Injectable({
//   providedIn: 'root'
// })
// export class PapersService {

//   public collections: Subject<Array<Paper_Item>>
//   private socket:WebSocket;
//   private response;
//   private collection_items = []

//   constructor(private collectionsService:CollectionsService,private dataService:DataService) {
//     this.collections = new Subject<Array<Paper_Item>>()
//     this.socket = this.dataService.socket;

//     //Subscribe to collection Service Active collections when a new collection gets activated
//     //get papers from collection
//     this.collectionsService.active_collections.subscribe(newData =>{
//       this.socket.onmessage = ((event) => {  
//         this.response = JSON.parse(event.data);
//         this.response.message.forEach((element)=>{
//           this.addData(element.data.key,element.data.name,element.data.parentCollection)
//           this.collections.next(this.collection_items)
//         })
//       })
//     })
//   }

//   addData(key:string,name:string,parentCollection:string){
//     let array = []
//     this.collection_items.push(new Paper_Item (key,name))
//   }
// }
