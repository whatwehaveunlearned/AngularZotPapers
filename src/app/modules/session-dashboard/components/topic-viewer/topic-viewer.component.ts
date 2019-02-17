import { Component, OnInit } from '@angular/core';

import { Topic } from '@app/shared/classes/topic';
import { CollectionsService } from '@app/shared/services/collections.service';

import * as D3 from 'd3';

@Component({
  selector: 'app-topic-viewer',
  templateUrl: './topic-viewer.component.html',
  styleUrls: ['./topic-viewer.component.css']
})
export class TopicViewerComponent implements OnInit {
  private topic_list: Array<Topic> = [];
  private selected: Array<number> = [];

  constructor(private collectionsService:CollectionsService) { }

  ngOnInit() {
     //Fetch data
     this.topic_list = this.collectionsService.getSessionTopics();

     this.collectionsService.topics_in_session_updated.subscribe(newData =>{
       this.topic_list = newData;
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
          .attr('r', (d) => 1)
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
          .attr('r', (d) => 5)
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
          .attr('r', (d) => 5)
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
        .attr('r', (d) => 1)
    });
  }
 }

}
