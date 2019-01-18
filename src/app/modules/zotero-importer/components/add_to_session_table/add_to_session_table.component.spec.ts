import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToSessionTableComponent } from './add_to_session_table.component';

describe('AddToSessionTableComponent', () => {
  let component: AddToSessionTableComponent;
  let fixture: ComponentFixture<AddToSessionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToSessionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToSessionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
