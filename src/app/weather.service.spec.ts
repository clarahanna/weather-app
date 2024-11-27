import { TestBed } from '@angular/core/testing';

import { SrviceService } from './weather.service';

describe('SrviceService', () => {
  let service: SrviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
