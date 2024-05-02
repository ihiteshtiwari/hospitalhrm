import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleviewComponent } from './scheduleview.component';

describe('ScheduleviewComponent', () => {
  let component: ScheduleviewComponent;
  let fixture: ComponentFixture<ScheduleviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
