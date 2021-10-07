import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CancionesService } from 'src/app/services/canciones.service';
import { ListaCancionesAuxService } from 'src/app/services/lista-canciones-aux.service';

import { VistaPremiumComponent } from "./vista-premium.component";;

describe('VistaPremiumComponent', () => {
  let component: VistaPremiumComponent;
  let fixture: ComponentFixture<VistaPremiumComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaPremiumComponent],
      imports: [RouterTestingModule,HttpClientTestingModule,FormsModule],
      providers: [CancionesService]

    })
      .compileComponents();
  });

  it(
    'should upload a song',
    inject(
      [HttpTestingController, CancionesService],
      (httpMock: HttpTestingController, dataService: CancionesService) => {
        const mockUsers = 
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
          };

        dataService.subirUnaCancion(mockUsers).subscribe(resp => {
          console.log(resp);
        });

        const mockReq = httpMock.expectOne(dataService.URL);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockUsers);

        httpMock.verify();
      }
    )
  );

  it(
    'should update a song',
    inject(
      [HttpTestingController, CancionesService],
      (httpMock: HttpTestingController, dataService: CancionesService) => {
        const mockUsers = 
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
          };

        dataService.editarCancion(mockUsers._id, mockUsers).subscribe(resp => {
          console.log(resp);
        });

        const mockReq = httpMock.expectOne(dataService.URL+ '/' + mockUsers._id);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockUsers);

        httpMock.verify();
      }
    )
  );

  it(
    'should delete a song',
    inject(
      [HttpTestingController, CancionesService],
      (httpMock: HttpTestingController, dataService: CancionesService) => {
        const mockUsers = 
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
          };

        dataService.eliminarCancion(mockUsers._id).subscribe(resp => {
          console.log(resp);
        });

        const mockReq = httpMock.expectOne(dataService.URL+ '/' + mockUsers._id);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockUsers);

        httpMock.verify();
      }
    )
  );



});