import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingviewComponent } from './trainingview.component';

describe('TrainingviewComponent', () => {
  let component: TrainingviewComponent;
  let fixture: ComponentFixture<TrainingviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
