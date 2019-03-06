import { Component, OnInit } from '@angular/core';

import { Topic } from '@app/shared/classes/topic';
import { CollectionsService } from '@app/shared/services/collections.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Word } from '@app/shared/classes/word';

import * as D3 from 'd3';

@Component({
  selector: 'app-topic-viewer',
  templateUrl: './topic-viewer.component.html',
  styleUrls: ['./topic-viewer.component.css']
})
export class TopicViewerComponent implements OnInit {
  private topic_list: Array<Topic> = [];
  private selected: Array<number> = [];
  private words: Array<Word> = []

  constructor(private collectionsService:CollectionsService) { }

  ngOnInit() {
     //Fetch data
     this.topic_list = this.collectionsService.getSessionTopics();

     this.collectionsService.topics_in_session_updated.subscribe(newData =>{
       this.topic_list = newData;
     })

    //Subscribe
    this.collectionsService.words_in_session_updated.subscribe(sessionWords =>{
      this.words = sessionWords;
    })

  }

  isTopicSelected(topicOrder){
    let result = this.selected.filter(topic => topic === topicOrder)
    let topicIsSelected = false
    if (result.length > 0){
      topicIsSelected = true
    }
    return topicIsSelected 
  }

  mouseClick(topic : any,event){
    console.log("mouse click : " + topic);
    if(this.isTopicSelected(topic.order)){ //Unselect
      // this.selected = false;
      D3.select('#topicCard-'+topic.order)
        .style("border","0 none #ccc")
      this.selected.splice(this.selected.indexOf(topic.order),1)
      topic.words.forEach(element => {
        if (element[element.length-1]==='*'){
          element = element.substring(0, element.length-1)
        }
        console.log(element);
        D3.select('#id_' + element)
          .attr('r', (d) => 2)
          .style('fill','#0f61ff')
      });
    }else{ //Select
      D3.select('#topicCard-'+ topic.order)
        .style("border","2px solid #ccc")
      this.selected.push(topic.order);
      topic.words.forEach(element => {
        if (element[element.length-1]==='*'){
          element = element.substring(0, element.length-1)
        }
        console.log(element);
        D3.select('#id_' + element)
          .attr('r', (d) => 4)
          .style('fill','#ffc1be')
      });
    }   
 }

  mouseEnter(topic : any){
    if(!this.isTopicSelected(topic.order)){
      console.log("mouse enter : " + topic);
      topic.words.forEach(element => {
        if (element[element.length-1]==='*'){
          element = element.substring(0, element.length-1)
        }
        console.log(element);
        D3.select('#id_' + element)
          .attr('r', (d) => 4)
          .style('fill','#ffc1be')
      });
    }
  }

 mouseOut(topic : any){
  if(!this.isTopicSelected(topic.order)){
    console.log("mouse out : " + topic);
    topic.words.forEach(element => {
      if (element[element.length-1]==='*'){
        element = element.substring(0, element.length-1)
      }
      console.log(element);
      D3.select('#id_' + element)
        .attr('r', (d) => 2)
        .style('fill','#0f61ff')
    });
  }
 }

 drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.topic_list, event.previousIndex, event.currentIndex);
}

thumbsDown(topic:any, event:Event){
  this.topic_list = this.topic_list.filter(topics => topics.order!=topic.order)  
}

}
