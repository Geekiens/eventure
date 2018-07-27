import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { BewerberVerwaltungComponent } from '@app/bewerberVerwaltung/bewerberVerwaltung.component';

describe(' BewerberVerwaltungComponent', () => {
  let component: BewerberVerwaltungComponent;
  let fixture: ComponentFixture<BewerberVerwaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          FlexLayoutModule,
          MaterialModule
        ],
        declarations: [BewerberVerwaltungComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BewerberVerwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
