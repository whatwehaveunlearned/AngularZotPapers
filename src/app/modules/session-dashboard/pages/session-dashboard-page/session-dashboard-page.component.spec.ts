import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDashboardPageComponent } from './session-dashboard-page.component';

describe('SessionDashboardPageComponent', () => {
  let component: SessionDashboardPageComponent;
  let fixture: ComponentFixture<SessionDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionDashboardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
