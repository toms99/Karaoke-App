import { Component, OnInit } from '@angular/core';
import {BlobServiceClient, ContainerClient} from "@azure/storage-blob";
import {NavigationEnd, Router} from "@angular/router";
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-vista-premium',
  templateUrl: './vista-premium.component.html',
  styleUrls: ['./vista-premium.component.css']
})
export class VistaPremiumComponent implements OnInit {

  sasToken = 'sp=racwdl&st=2021-08-30T07:58:37Z&se=2021-11-17T15:58:37Z&sv=2020-08-04&sr=c&sig=%2BjC8VVk%2FWlIrm66FnLQKdm0bx31%2F8Plg3EaO3EGFLnQ%3D'; // Fill string with your SAS token
  containerName = 'user1';
  storageAccountName = 'soakaraokestorage';
  constructor(private router: Router, private player: PlayerService ) { }

  ngOnInit(): void {

  }

  fileContent: string = '';

  public onChange(event: any) {
    let fileList = event.target.files;
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.player.fileContent = (fileReader.result) ? fileReader.result.toString() : "";
    }
    console.log(this.fileContent);
    fileReader.readAsText(file);
  }   

  public navigate(comprobacion: string): void {
    if(comprobacion === 'UsuarioPremium'){

    }
  }

  public IrAStrem(): void{
    this.router.navigateByUrl('/stream');
    console.log(this.player.fileContent);
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
