import { Component, OnInit } from '@angular/core';

import { Topic } from '@app/shared/classes/topic';
import { CollectionsService } from '@app/shared/services/collections.service';

@Component({
  selector: 'app-topic-viewer',
  templateUrl: './topic-viewer.component.html',
  styleUrls: ['./topic-viewer.component.css']
})
export class TopicViewerComponent implements OnInit {
  private topic_list: Array<Topic> = []

  constructor(private collectionsService:CollectionsService) { }

  ngOnInit() {
     //Fetch data
     this.topic_list = this.collectionsService.getSessionTopics();

     this.collectionsService.topics_in_session_updated.subscribe(newData =>{
       this.topic_list = newData;
     })
  }

  get5Elements(){
    
  }

}
