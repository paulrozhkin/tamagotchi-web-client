import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementRestaurantsComponent } from './management-restaurants.component';

describe('RestaurantsComponent', () => {
  let component: ManagementRestaurantsComponent;
  let fixture: ComponentFixture<ManagementRestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementRestaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
