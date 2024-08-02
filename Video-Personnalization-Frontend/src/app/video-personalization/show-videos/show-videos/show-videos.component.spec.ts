import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVideosComponent } from './show-videos.component';

describe('ShowVideosComponent', () => {
  let component: ShowVideosComponent;
  let fixture: ComponentFixture<ShowVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowVideosComponent]
    });
    fixture = TestBed.createComponent(ShowVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
