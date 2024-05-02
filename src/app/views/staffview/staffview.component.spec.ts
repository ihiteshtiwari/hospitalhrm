import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffviewComponent } from './staffview.component';

describe('StaffviewComponent', () => {
  let component: StaffviewComponent;
  let fixture: ComponentFixture<StaffviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
