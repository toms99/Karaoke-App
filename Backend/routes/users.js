var express = require('express');
var router = express.Router();
var database = require('../public/javascripts/DataBaseInterface');
const { BlobServiceClient, generateBlobSASQueryParameters, ContainerSASPermissions, StorageSharedKeyCredential} = require('@azure/storage-blob');
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=soakaraokestorage;AccountKey=DRhzPgINTEWI8IeQ9MjMBQol/vEnLbECZDYI53+2yCkQAT8qva6BbbUnFWhaqkA/t4H6omWvlJ1bobcR7O8ETg==;EndpointSuffix=core.windows.net";
var cors = require('cors')
var app = require('../app');
const accountName = "soakaraokestorage";
const accountKey = "DRhzPgINTEWI8IeQ9MjMBQol/vEnLbECZDYI53+2yCkQAT8qva6BbbUnFWhaqkA/t4H6omWvlJ1bobcR7O8ETg==";
const credential = new StorageSharedKeyCredential(accountName, accountKey)


router.get('/:username', cors(app.corsOptions), async function(req, res, next) {
    try{
      let query = {username: req.params.username}
      let user = await database.users.findOne(query);
      delete user.password
      if(user ){
        res.jsonp(user);
      }else{
        res.status(404).jsonp({message:"No user found"});
      }
    }
    catch(error){
      console.log(error)
      res.status(500).jsonp({error});
    }
  });

router.post('/', cors(app.corsOptions), async function(req, res, next) {
    // Se obtienen los parametros de entrada
    let password = req.body.password
    let username = req.body.username
    try{
      // Se verifica si el usuario ya existe en la base de datos
      let user = await database.users.findOne({username});  

      if(user){
        res.status(409).jsonp({message:"The username is already in use."});
      }else{
        // Se genera la carpeta del usuario en el storage
        let key
        let containerClient
        let storageerror = false
        try{
          const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
          containerClient = blobServiceClient.getContainerClient(username);
          // Se crea el container 
          const createContainerResponse = await containerClient.create();
          // Se establecen las opciones para la key del container
          const options = {containerName: containerClient.containerName,
            expiresOn: new Date(2022, 1, 1), 
            startsOn: new Date(2020, 1, 1), 
            permissions: ContainerSASPermissions.from({create: true, delete: true, read: true, write: true})
          }
          // Se genera la llave
          key = generateBlobSASQueryParameters(options, credential).toString()
        }catch(e){
          storageerror = true
        }
  
        if(storageerror){
          res.status(502).jsonp({message:"An error ocurred on the creation of the users storage space. The registration was unsuccessful"});
        }else{
          // Se agrega el usuario a la base de datos
          let result = await database.users.insertOne({username, password, key})
          if(result.insertedId ){
            res.status(201).jsonp({message:"Successfully registered."});
          }else{
            // Se elimina la carpeta de la base de datos
            await containerClient.delete();
            res.status(502).jsonp({message:"An error ocurred on the database. The registration was unsuccessful"});
          }
        }
      }
  
    }catch(error){
      res.status(500).jsonp({error});
    }
    
  });

  module.exports = router;
