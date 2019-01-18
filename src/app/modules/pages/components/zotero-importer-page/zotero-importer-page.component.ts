import { Component, OnInit,ViewChild } from '@angular/core';

import {CollectionsService} from '@app/shared/services/collections.service';
import { Paper_Item } from '@app/shared/classes/paper';

@Component({
  selector: 'app-zotero-importer-page',
  templateUrl: './zotero-importer-page.component.html',
  styleUrls: ['./zotero-importer-page.component.css']
})
export class ZoteroImporterPageComponent implements OnInit {
  private papers_to_add: Array<Paper_Item> = [];

  constructor(private collectionsService:CollectionsService) { }

  ngOnInit() {
    //Subscribe to paper service
    this.collectionsService.papers_to_add_to_session_updated.subscribe(newData =>{
      this.papers_to_add = newData;
    })
  }

  addToSess(){
    this.collectionsService.addPaperToSession(this.papers_to_add)
  }
}