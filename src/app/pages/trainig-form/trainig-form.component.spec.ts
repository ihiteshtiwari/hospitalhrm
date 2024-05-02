import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainigFormComponent } from './trainig-form.component';

describe('TrainigFormComponent', () => {
  let component: TrainigFormComponent;
  let fixture: ComponentFixture<TrainigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
