import { TestBed } from '@angular/core/testing';

import { MoviedataService } from './moviedata.service';

describe('MoviedataService', () => {
  let service: MoviedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
