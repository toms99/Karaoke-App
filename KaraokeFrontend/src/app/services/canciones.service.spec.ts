import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CancionesService } from './canciones.service';

describe('CancionesService', () => {
  let service: CancionesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancionesService],
      imports: [ HttpClientTestingModule ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancionesService);
  });

  

});