import { NgModule } from '@angular/core';

import {SharedModule} from '@app/shared'

import { TopicViewerComponent } from './components/topic-viewer/topic-viewer.component';
import { PaperListComponent } from './components/paper-list/paper-list.component';
import { ScatterplotComponent } from './components/scatterplot/scatterplot.component';

import {SessionDashboardPageComponent} from './pages/session-dashboard-page/session-dashboard-page.component';
import { AuthorListComponent } from './components/author-list/author-list.component'

@NgModule({
  declarations: [
    TopicViewerComponent,
    PaperListComponent,
    ScatterplotComponent,
    SessionDashboardPageComponent,
    AuthorListComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    TopicViewerComponent,
    PaperListComponent,
    SessionDashboardPageComponent
  ]
})
export class SessionDashboardModule { }
