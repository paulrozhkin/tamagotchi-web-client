import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemCreateComponent } from './menu-item-create.component';

describe('MenuItemCreateComponent', () => {
  let component: MenuItemCreateComponent;
  let fixture: ComponentFixture<MenuItemCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
