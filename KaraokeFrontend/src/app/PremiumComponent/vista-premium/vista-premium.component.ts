import { Component, OnInit } from '@angular/core';
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { Router } from "@angular/router";
import { Cancion } from "../../Clases/Cancion";
import { CancionesService } from "../../services/canciones.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import * as fs from 'fs';
import { PlayerService } from "../../services/player.service";
import { CookieService } from "ngx-cookie-service";
import { ListaCancionesAuxService } from 'src/app/services/lista-canciones-aux.service';
import { LyricsParserService } from 'src/app/services/lyrics-parser.service';

@Component({
  selector: 'app-vista-premium',
  templateUrl: './vista-premium.component.html',
  styleUrls: ['./vista-premium.component.css']
})
export class VistaPremiumComponent implements OnInit {
  storageAccountName = 'soakaraokestorage';
  listaDeCacniones: Cancion[] = [];
  cancionActual: Cancion = new Cancion();
  cancionSubir: Cancion = new Cancion();
  public loading = false;
  constructor(private router: Router, private service: CancionesService, private playerAux: PlayerService,
    private cookieService: CookieService, private listaCancionesService: ListaCancionesAuxService, private parser: LyricsParserService) { }

  ngOnInit(): void {
    this.listaCancionesService.sharedListaCanciones.subscribe(listaCanciones => this.listaDeCacniones = listaCanciones)
    this.service.obtenerListaCancionesPrivadas().subscribe(lista => {
      this.listaDeCacniones = lista;
      console.log(lista)
    })
  }

  fileContent: string = '';


  public crearCancion(): void {
    this.cancionSubir.letra = this.playerAux.letra;
    this.cancionSubir.owner = JSON.parse(this.cookieService.get('user')).username
    this.service.subirUnaCancion(this.cancionSubir).subscribe(respuesta => {
      console.log(respuesta);
      // @ts-ignore
      this.cancionSubir.filename = respuesta.filename;
      this.uploadFileToBlob(this.cancionSubir.filename);
      this.ngOnInit()
    }, error => console.log(error))
  }

  public itemActual(item: Cancion) {
    this.cancionActual = item;
  }
  public ediarCancionLetra() {
    this.cancionActual.letra = this.playerAux.letra;
    this.service.editarCancion(this.cancionActual._id, this.cancionActual).subscribe(respuesta => {
      console.log(respuesta)
      this.ngOnInit();
    })
  }

  public editarCancionMusica(): void {
    this.uploadFileToBlob(this.cancionActual.filename);
    this.ngOnInit();
  }

  public eliminarCancion(): void {
    this.service.eliminarCancion(this.cancionActual._id).subscribe(respuesta => {
      console.log(respuesta)
      this.ngOnInit();
    })
  }

  public navigate(comprobacion: string): void {
    if (comprobacion === 'UsuarioPremium') {
    }
  }


  public IrAStrem(item: Cancion): void {
    this.playerAux.cancion = item;
    this.router.navigateByUrl('/stream');

  }

  fileSelected: any;

  actualizarFile = async (event: any): Promise<void> => {
    this.fileSelected = event.target.files[0]
  }

  public async uploadFileToBlob(fileName: string): Promise<void> {
    let file = this.fileSelected;
    if (!file) return;

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
      "https://" + this.storageAccountName + ".blob.core.windows.net/?" + this.cookieService.get('key')
    );

    // get Container - full public read access
    const containerClient: ContainerClient = blobService.getContainerClient(JSON.parse(this.cookieService.get('user')).username);

    await this.createBlobInContainer(containerClient, file, fileName);
  };

  createBlobInContainer = async (containerClient: ContainerClient, file: File, fileName: string) => {

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(fileName);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };
    // upload file
    this.loading = true;
    await blobClient.uploadBrowserData(file, options);
    this.loading = false;
  }


  public onChange(event: any): void {
    let fileList = event.target.files;
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.parser.lyrics = (fileReader.result) ? fileReader.result.toString() : "";
      self.playerAux.letra = self.parser.tomsify().letra;
    }
    fileReader.readAsText(file);
  }
}
