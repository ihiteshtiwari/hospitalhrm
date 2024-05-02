import { TestBed } from '@angular/core/testing';

import { EmployeeRecruitmentService } from './employee-recruitment.service';

describe('EmployeeRecruitmentService', () => {
  let service: EmployeeRecruitmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeRecruitmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
