import { TestBed } from '@angular/core/testing';

import { ThemifyService } from './themify.service';

describe('ThemifyService', () => {
  let service: ThemifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
