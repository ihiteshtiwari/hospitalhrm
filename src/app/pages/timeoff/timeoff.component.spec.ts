import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoffComponent } from './timeoff.component';

describe('TimeoffComponent', () => {
  let component: TimeoffComponent;
  let fixture: ComponentFixture<TimeoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeoffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
