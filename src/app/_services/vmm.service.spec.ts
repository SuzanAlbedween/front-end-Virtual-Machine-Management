import { TestBed } from '@angular/core/testing';

import { VMMService } from './vmm.service';

describe('VMMService', () => {
  let service: VMMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VMMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
