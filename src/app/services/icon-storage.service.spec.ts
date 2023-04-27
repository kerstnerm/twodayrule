import { TestBed } from '@angular/core/testing';

import { IconStorageService } from './icon-storage.service';

describe('IconStorageService', () => {
  let service: IconStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
