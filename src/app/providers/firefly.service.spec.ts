import { TestBed } from '@angular/core/testing';

import { FireflyService } from './firefly.service';

describe('FireflyService', () => {
  let service: FireflyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireflyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
