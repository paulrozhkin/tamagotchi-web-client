import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementDishesComponent } from './management-dishes.component';

describe('DishesComponent', () => {
  let component: ManagementDishesComponent;
  let fixture: ComponentFixture<ManagementDishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementDishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
