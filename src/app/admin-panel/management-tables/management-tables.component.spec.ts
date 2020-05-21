import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementTablesComponent } from './management-tables.component';

describe('TablesComponent', () => {
  let component: ManagementTablesComponent;
  let fixture: ComponentFixture<ManagementTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
