// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   private socket:WebSocket;
//   // response:{ message:[{data:{key: string, name: string, parentCollection: string},key:string,library:{},links:{},meta:{},version:number}], type:string} = { message:[{data:{},key:'',library:{},links:{},meta:{},version:0}], type:"string"};
//   data: { key: string, name: string, parentCollection: string}[];

//   constructor() {
//     this.socket = new WebSocket("ws://" + window.location.hostname + ":3000");
//     this.socket.onmessage = ((event) => {  
//       this.response = JSON.parse(event.data);
//       this.response.message.forEach((element)=>{
//         this.addData(element.data.key,element.data.name,element.data.parentCollection)
//       })
//     })

//    }

//   addData(key:string,name:string,parentCollection:string){
//     this.data.push({
//       key:key,
//       name:name,
//       parentCollection:parentCollection,
//     })
//   }
// }
