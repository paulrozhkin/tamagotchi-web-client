import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementReleasesComponent } from './management-releases.component';

describe('ManagementReleasesComponent', () => {
  let component: ManagementReleasesComponent;
  let fixture: ComponentFixture<ManagementReleasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementReleasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
