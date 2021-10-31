var express = require('express');
var router = express.Router();
const { BlobServiceClient } = require('@azure/storage-blob');
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=soakaraokestorage;AccountKey=DRhzPgINTEWI8IeQ9MjMBQol/vEnLbECZDYI53+2yCkQAT8qva6BbbUnFWhaqkA/t4H6omWvlJ1bobcR7O8ETg==;EndpointSuffix=core.windows.net";
var cors = require('cors')
var app = require('../app')
const keycloak = require('../config/keycloak.js').getKeycloak();




router.delete('/:container/:blob', cors(app.corsOptions), async function(req, res, next) {
  try{
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient =  blobServiceClient.getContainerClient(req.params.container)  
    await containerClient.deleteBlob(req.params.blob)
    res.jsonp({message:"Successfully deleted one song from the storage."});
  }
  catch(error){
    res.status(500).jsonp({message:"Internal Server Error. No song was deleted."});
  }
});


module.exports = router;
router.options('/', cors(app.corsOptions)) // enable pre-flight request for DELETE request
router.options('/:id', cors(app.corsOptions)) // enable pre-flight request for DELETE request
