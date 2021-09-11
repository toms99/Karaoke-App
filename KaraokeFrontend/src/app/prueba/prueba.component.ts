import { Component, OnInit } from '@angular/core';
import {BlobServiceClient, ContainerClient} from '@azure/storage-blob';
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  sasToken = 'sp=racwdl&st=2021-09-05T21:44:07Z&se=2023-01-02T05:44:07Z&sv=2020-08-04&sr=c&sig=BsOBHmTyA47jYOoegAT1rGUlRfifZFCR39FW2fbQcOg%3D'; // Fill string with your SAS token
  containerName = 'user1';
  storageAccountName = 'soakaraokestorage';
  files: FileList = new FileList();
  constructor() { }

  ngOnInit(): void {

  }

  uploadFileToBlob = async (file: File | null): Promise<void> =>{
    if (!file) return ;

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
      "https://"+this.storageAccountName+".blob.core.windows.net/?"+this.sasToken
    );

    // get Container - full public read access
    const containerClient: ContainerClient = blobService.getContainerClient(this.containerName);
    await containerClient.createIfNotExists({
      access: 'container',
    });

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
