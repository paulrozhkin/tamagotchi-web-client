import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesUpdateComponent } from './tables-update.component';

describe('TablesUpdateComponent', () => {
  let component: TablesUpdateComponent;
  let fixture: ComponentFixture<TablesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
