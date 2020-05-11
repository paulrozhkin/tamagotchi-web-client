import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemUpdateComponent } from './menu-item-update.component';

describe('MenuItemUpdateComponent', () => {
  let component: MenuItemUpdateComponent;
  let fixture: ComponentFixture<MenuItemUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
