import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonlayoutadminComponent } from './commonlayoutadmin.component';

describe('CommonlayoutadminComponent', () => {
  let component: CommonlayoutadminComponent;
  let fixture: ComponentFixture<CommonlayoutadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonlayoutadminComponent]
    });
    fixture = TestBed.createComponent(CommonlayoutadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
