import { TestBed } from '@angular/core/testing';

import { DatasharingService } from './datasharing.service';

describe('DatasharingService', () => {
  let service: DatasharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
