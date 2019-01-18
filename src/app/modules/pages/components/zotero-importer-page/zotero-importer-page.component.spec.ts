import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoteroImporterPageComponent } from './zotero-importer-page.component';

describe('MainComponent', () => {
  let component: ZoteroImporterPageComponent;
  let fixture: ComponentFixture<ZoteroImporterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoteroImporterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoteroImporterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
