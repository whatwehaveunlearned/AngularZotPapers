import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'

import { Collection_Item } from '@app/shared/classes/collections';
import { Paper_Item } from '@app/shared/classes/paper';
import { Author } from '@app/shared/classes/author';
import { Word } from '@app/shared/classes/word';

import { Topic } from '@app/shared/classes/topic'

import {entries} from 'd3-collection'

import * as d3 from 'd3';


@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
 
  
  public socket:WebSocket;
  private response;
  
  //Zotero Importer Collections
  public active_collections: Subject<Array<Collection_Item>> =  new Subject<Array<Collection_Item>>();
  public papers_in_active_collections_updated: Subject<Array<Paper_Item>>;
  public collections: Subject<Array<Collection_Item>>;
  private collection_items = []
  private papers_in_active_collections = []

  public papers_to_add_to_session_updated: Subject<Array<Paper_Item>>
  private papers_to_add_to_session = []

  //Dashboard Collections
  public papers_in_session_updated: Subject<Array<Paper_Item>>
  private papers_in_session = []

  public authors_in_session_updated : Subject<Array<Author>>
  private authors_in_session = []

  public topics_in_session_updated : Subject<Array<Topic>>
  private topics_in_session = []

  public words_in_session_updated : Subject<Array<Word>>
  private words_in_session = []
  

  constructor() {
    //Initialize the Subjects
    this.collections = new Subject<Array<Collection_Item>>()
    this.papers_in_active_collections_updated = new Subject<Array<Paper_Item>>()
    this.papers_to_add_to_session_updated = new Subject<Array<Paper_Item>>()
    this.papers_in_session_updated = new Subject<Array<Paper_Item>>()
    this.authors_in_session_updated = new Subject<Array<Author>>()
    this.topics_in_session_updated = new Subject<Array<Topic>>();
    this.words_in_session_updated = new Subject<Array<Word>>();
    //Create the communication socket
    this.socket = new WebSocket("ws://" + window.location.hostname + ":3000");
    this.socket.onmessage = ((event) => {
      //If we get data  
      this.recieved_data(event)
    })
    this.active_collections.subscribe(selectedCollection =>{
      console.log(this.active_collections)
      let message = {
        'msg':selectedCollection[0].key,
        'type':'collections'
      }
      this.socket.send(JSON.stringify(message))
    })

   }

  addCollection(key:string,name:string,parentCollection:string){
    this.collection_items.push(new Collection_Item (key,name,parentCollection))
  }

  addPapersToAddToSession(paper_list){
    paper_list.forEach((element)=>{
      let data = element
      this.papers_to_add_to_session.push(new Paper_Item (data.key,data.name,data.contentType,data.creators,data.date,data.dateAdded,data.dateModified,data.fileName,data.itemType, data.linkMode, data.md5, data.note_x, data.note_y, data.parentItem_x, data.parentItem_y, data.pdf_file,data.tags_x,data.tags_y))
      this.papers_to_add_to_session_updated.next(this.papers_to_add_to_session);
    })
  }  

  getPapersToAddToSession(){
    return [...this.papers_to_add_to_session]
  }

  getCollections(){
    return [...this.collection_items]
  }

  getPapersActiveCollections(){
    return [...this.papers_in_active_collections]
  }

  getAuthorsInSession(){
    return [...this.authors_in_session]
  }

  // addPaper(key:string,name:string,contentType:string,creators:Array<string>,date:string,dateAdded:string,dateModified:string,fileName:string,itemType:string,linkMode:string,md5:string,note_x:string,note_y:string,parentItem_x:string,parentItem_y:string,pdf_file:string,tags_x:string,tags_y:string){
  //   this.papers_in_active_collections.push(new Paper_Item (key,name,contentType,creators,date,dateAdded,dateModified,fileName,itemType,linkMode,md5,note_x,note_y,parentItem_x,parentItem_y,pdf_file,tags_x,tags_y))
  // }

  recieved_data(event){
    this.response = JSON.parse(event.data);
    if(this.response.type==='collections'){
      this.response.message.forEach((element)=>{
        let data = element.data
        this.addCollection(data.key,data.name,data.parentCollection)
        this.collections.next(this.collection_items)
      })
    }else if(this.response.type==='collection_items'){
      this.response.message.forEach((element)=>{
        let data = element
        this.papers_in_active_collections.push(new Paper_Item (data.key,data.name,data.contentType,data.creators,data.date,data.dateAdded,data.dateModified,data.fileName,data.itemType, data.linkMode, data.md5, data.note_x, data.note_y, data.parentItem_x, data.parentItem_y, data.pdf_file,data.tags_x,data.tags_y))
        this.papers_in_active_collections_updated.next(this.papers_in_active_collections)
      })
		}else if(this.response.type==='sageBrain_data'){
      console.log(this.response.message)
      this.response.message.authors.forEach((element)=>{
        let data = element
        this.authors_in_session.push(new Author(data.Affiliation,data.Author,data.Citations,data.Email,data.Exits,data.Hindex,data.Hindex5y,data.I10Index,data.I10Index5y,data.ID,data.Interests,data.Name,data.PapersIds,data.Papers_in_collection,data.Picture,data.publications))
        this.authors_in_session_updated.next(this.authors_in_session);
      })
      // this.response.message.years.forEach((element)=>{
      //   let data = element
      //   // this.addPaper(data.key,data.name,data.contentType,data.creators,data.date,data.dateAdded,data.dateModified,data.fileName,data.itemType, data.linkMode, data.md5, data.note_x, data.note_y, data.parentItem_x, data.parentItem_y, data.pdf_file,data.tags_x,data.tags_y)
      //   // this.papers_in_session_updated.next(this.papers_in_active_collections)
      // })
      this.response.message.doc_topics.order.forEach((position)=>{
        if(position!== "pos"){
          let data = this.response.message.doc_topics.topics[position];
          this.topics_in_session.push(new Topic(0,position, this.response.message.doc_topics.topics[position]));
          this.topics_in_session_updated.next(this.topics_in_session);
        }

      })
      JSON.parse(this.response.message.doc_topics.words).forEach((element)=>{
        let data = element
        this.words_in_session.push(new Word(data.C,data.count,data.exemplar,data.pos,data.sigma_nor,data.topic,data.vector,data.vocab_index,data.word,data.x2D,data.y2D));
        this.words_in_session_updated.next(this.words_in_session);
      })
      //Here I need to Add the Authors, Years and Topics
      // this.papers_in_session = this.papers_to_add_to_session;
      // this.papers_in_session.next(this.papers_to_add_to_session)   
    }
  }

  addToPapersToSageBrain(selected_papers){
    let message = {
      'msg':selected_papers,
      'type':'add_papers'
    }
    this.socket.send(JSON.stringify(message))
    selected_papers.forEach((element)=>{
      this.papers_in_session_updated.next(element);
    })
  }

  addPaperToSession(paper_list){
    paper_list.forEach((element)=>{
      let data = element
      this.papers_in_session.push(new Paper_Item (data.key,data.name,data.contentType,data.creators,data.date,data.dateAdded,data.dateModified,data.fileName,data.itemType, data.linkMode, data.md5, data.note_x, data.note_y, data.parentItem_x, data.parentItem_y, data.pdf_file,data.tags_x,data.tags_y))
      this.papers_in_session_updated.next(this.papers_in_session);
    })
    let message = {
      'msg':paper_list,
      'type':'add_papers'
    }
    this.socket.send(JSON.stringify(message))
  }

  //Get Session Data
  getSessionPapers():Array<Paper_Item>{
    return [...this.papers_in_session]; //Returns a new array of paper Items protects the internal array
  }
  getSessionTopics():Array<Topic>{
    return [...this.topics_in_session]; //Returns a new array of paper Items protects the internal array
  }
  getSessionWords():Array<Word>{
    return [...this.words_in_session]; //Returns a new array of paper Items protects the internal array
  }
}