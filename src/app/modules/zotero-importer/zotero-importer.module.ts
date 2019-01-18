import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { CollectionTableComponent } from './components/collection_table/collection_table.component';
import { PaperInCollectionTableComponent } from './components/paper_in_collection_table/paper_in_collection_table.component';
import { AddToSessionTableComponent } from './components/add_to_session_table/add_to_session_table.component';

import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    CollectionTableComponent,
    PaperInCollectionTableComponent,
    AddToSessionTableComponent,
  ],
  providers: [],
  exports: [
    CollectionTableComponent,
    PaperInCollectionTableComponent,
    AddToSessionTableComponent
  ]
})
export class ZoteroImporterModule { }
