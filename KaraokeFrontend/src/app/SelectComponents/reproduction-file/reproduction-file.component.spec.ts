import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CancionesService } from 'src/app/services/canciones.service';
import { ListaCancionesAuxService } from 'src/app/services/lista-canciones-aux.service';
import { PlayerService } from 'src/app/services/player.service';

import { ReproductionFileComponent } from "./reproduction-file.component";;

describe('ReproductionFileComponent', () => {
  let component: ReproductionFileComponent;
  let fixture: ComponentFixture<ReproductionFileComponent>;
  let cancionesService: CancionesService;
  let playerService: PlayerService;
  let listaCacnionService: ListaCancionesAuxService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReproductionFileComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [CancionesService]

    })
      .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ReproductionFileComponent);
  //   component = fixture.componentInstance;
  //   cancionesService = TestBed.inject(CancionesService);
  //   // listaCacnionService = TestBed.inject(ListaCancionesAuxService);
  //   // playerService = TestBed.inject(PlayerService);
  //   fixture.detectChanges();
  // });

  it(
    'should get list of songs',
    inject(
      [HttpTestingController, CancionesService],
      (httpMock: HttpTestingController, dataService: CancionesService) => {
        const mockUsers = [
          {
            _id: '3',
            nombre: 'Photograph',
            letra: [
              {
                "second": 16.01,
                "words": "Loving can hurt, loving can hurt sometimes"
              },
              {
                "second": 24.79,
                "words": "But it's the only thing that I know"
              },
              {
                "second": 33.52,
                "words": "When it gets hard, you know it can get hard sometimes"
              }],
            artista: 'Ed Sheeran',
            album: 'X',
            owner: 'Alfaro',
            url: 'https://www.youtube.com/watch?v=i5rRH6OWt58',
            filename: 'audio1',
          }
        ];

        dataService.obtenerListaCancionesPublicas().subscribe(lista => {
          if (lista.length!=0 ){
              expect(lista).toEqual(mockUsers);
          }
        });

        const mockReq = httpMock.expectOne(dataService.URL);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockUsers);

        httpMock.verify();
      }
    )
  );

  


});