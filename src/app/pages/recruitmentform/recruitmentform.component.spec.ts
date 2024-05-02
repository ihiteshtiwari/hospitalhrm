import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentformComponent } from './recruitmentform.component';

describe('RecruitmentformComponent', () => {
  let component: RecruitmentformComponent;
  let fixture: ComponentFixture<RecruitmentformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruitmentformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruitmentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
