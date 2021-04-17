import { TestBed } from '@angular/core/testing';

import { PersonalizatiionService } from './personalizatiion.service';

describe('PersonalizatiionService', () => {
  let service: PersonalizatiionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalizatiionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
