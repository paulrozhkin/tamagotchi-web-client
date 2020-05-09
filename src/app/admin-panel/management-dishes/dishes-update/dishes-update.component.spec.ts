import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesUpdateComponent } from './restaurant-update.component';

describe('RestaurantUpdateComponent', () => {
  let component: DishesUpdateComponent;
  let fixture: ComponentFixture<DishesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
