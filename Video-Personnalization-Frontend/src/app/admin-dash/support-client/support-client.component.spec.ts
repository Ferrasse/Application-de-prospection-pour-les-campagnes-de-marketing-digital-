import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportClientComponent } from './support-client.component';

describe('SupportClientComponent', () => {
  let component: SupportClientComponent;
  let fixture: ComponentFixture<SupportClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportClientComponent]
    });
    fixture = TestBed.createComponent(SupportClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
