import { TestBed } from '@angular/core/testing';

import { TriagesService } from './triages.service';

describe('TriagesService', () => {
  let service: TriagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
