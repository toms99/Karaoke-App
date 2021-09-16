import { Component, OnInit } from '@angular/core';
import {BlobServiceClient, ContainerClient} from "@azure/storage-blob";
import {Router} from "@angular/router";
import {Cancion} from "../../Clases/Cancion";
import {CancionesService} from "../../services/canciones.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import * as fs from 'fs';
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-vista-premium',
  templateUrl: './vista-premium.component.html',
  styleUrls: ['./vista-premium.component.css']
})
export class VistaPremiumComponent implements OnInit {


  sasToken = 'sp=racwdl&st=2021-08-30T07:58:37Z&se=2021-11-17T15:58:37Z&sv=2020-08-04&sr=c&sig=%2BjC8VVk%2FWlIrm66FnLQKdm0bx31%2F8Plg3EaO3EGFLnQ%3D'; // Fill string with your SAS token
  containerName = 'user1';
  storageAccountName = 'soakaraokestorage';

  listaDeCacniones: Cancion[] = [];
  cancionActual: Cancion = new Cancion();
  cancionSubir: Cancion = new  Cancion();
  urlLetraString: string = ''



  constructor(private router: Router,  private service: CancionesService, private playerAux: PlayerService) { }

  ngOnInit(): void {
    this.service.obtenerListaCancionesPrivadas('user1').subscribe(lista =>
    {this.listaDeCacniones = lista;
      console.log(lista)
    })
  }

  fileContent: string = '';

  public onChange(event: any): void {
    let fileList = event.target.files;
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.playerAux.letra = (fileReader.result) ? fileReader.result.toString() : "";
    }
    fileReader.readAsText(file);
  }


  public crearCancion(): void{
    this.cancionSubir.letra = this.playerAux.letra;
    console.log(this.cancionSubir.filename);
    this.service.subirUnaCancion(this.cancionSubir).subscribe(respuesta => {
      console.log(respuesta);
      this.ngOnInit()
    },error => console.log(error)
    )

  }

  public navigate(comprobacion: string): void {
    if(comprobacion === 'UsuarioPremium'){
    }
  }


  public IrAStrem(): void{
    this.router.navigateByUrl('/stream');
  }




  uploadFileToBlob = async (event: any): Promise<void> =>{
    let file = event.target.files[0]
    console.log(file)
    if (!file) return ;

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
      "https://"+this.storageAccountName+".blob.core.windows.net/?"+this.sasToken
    );

    // get Container - full public read access
    const containerClient: ContainerClient = blobService.getContainerClient(this.containerName);


    await this.createBlobInContainer(containerClient, file);


  };

  createBlobInContainer = async (containerClient: ContainerClient, file: File) => {

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };
    // upload file
    await blobClient.uploadBrowserData(file, options);
  }
}
