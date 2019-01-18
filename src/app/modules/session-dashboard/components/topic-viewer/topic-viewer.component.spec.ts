import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicViewerComponent } from './topic-viewer.component';

describe('TopicViewerComponent', () => {
  let component: TopicViewerComponent;
  let fixture: ComponentFixture<TopicViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
