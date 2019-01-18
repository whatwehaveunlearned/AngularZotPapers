import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { SharedModule } from '@app/shared';
import { PagesModule } from '@app/modules/pages/pages.module';
import {ZoteroImporterModule} from '@app/modules/zotero-importer/zotero-importer.module';
import {SessionDashboardModule} from '@app/modules/session-dashboard/session-dashboard.module';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {CollectionsService} from '@app/shared/services/collections.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    PagesModule,
    ZoteroImporterModule,
    SessionDashboardModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [CollectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
