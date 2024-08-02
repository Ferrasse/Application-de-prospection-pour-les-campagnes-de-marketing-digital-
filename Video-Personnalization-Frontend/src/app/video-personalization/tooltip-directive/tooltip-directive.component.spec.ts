import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipDirectiveComponent } from './tooltip-directive.component';

describe('TooltipDirectiveComponent', () => {
  let component: TooltipDirectiveComponent;
  let fixture: ComponentFixture<TooltipDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipDirectiveComponent]
    });
    fixture = TestBed.createComponent(TooltipDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
