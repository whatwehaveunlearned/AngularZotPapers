import { NgModule } from '@angular/core';

import {ZoteroImporterModule} from '@app/modules/zotero-importer/zotero-importer.module'

import { SharedModule } from '@app/shared';

import {LoginComponent} from './components/login/login.component'
import {SignupComponent} from './components/signup/signup.component'
import {ZoteroImporterPageComponent} from './components/zotero-importer-page/zotero-importer-page.component'

@NgModule({
  imports: [
    SharedModule,
    ZoteroImporterModule,
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    ZoteroImporterPageComponent,
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    ZoteroImporterPageComponent,
  ]
})
export class PagesModule { }
