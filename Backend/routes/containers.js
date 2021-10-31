var express = require('express');
var router = express.Router();
const { BlobServiceClient, generateBlobSASQueryParameters, ContainerSASPermissions, StorageSharedKeyCredential} = require('@azure/storage-blob');
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=soakaraokestorage;AccountKey=DRhzPgINTEWI8IeQ9MjMBQol/vEnLbECZDYI53+2yCkQAT8qva6BbbUnFWhaqkA/t4H6omWvlJ1bobcR7O8ETg==;EndpointSuffix=core.windows.net";
var cors = require('cors')
var app = require('../app')
const keycloak = require('../config/keycloak.js').getKeycloak();
const accountName = "soakaraokestorage";
const accountKey = "DRhzPgINTEWI8IeQ9MjMBQol/vEnLbECZDYI53+2yCkQAT8qva6BbbUnFWhaqkA/t4H6omWvlJ1bobcR7O8ETg==";
const credential = new StorageSharedKeyCredential(accountName, accountKey)




router.post('/', cors(app.corsOptions), async function(req, res, next) {
    let username = req.query.username
    try{
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        containerClient = blobServiceClient.getContainerClient(username);
        // Se crea el container 
        const createContainerResponse = await containerClient.create();
        console.log(createContainerResponse)
        // Se establecen las opciones para la key del container
        const options = {containerName: containerClient.containerName,
            expiresOn: new Date(2022, 1, 1), 
            startsOn: new Date(2020, 1, 1), 
            permissions: ContainerSASPermissions.from({create: true, delete: true, read: true, write: true})
        }
        // Se genera la llave
        key = generateBlobSASQueryParameters(options, credential).toString()
        console.log(key)
        res.status(200).jsonp({key});
    }catch(error){
        res.status(500).jsonp({message:"Internal Server Error."});
    }
});


module.exports = router;
router.options('/', cors(app.corsOptions)) // enable pre-flight request for DELETE request
router.options('/:id', cors(app.corsOptions)) // enable pre-flight request for DELETE request
