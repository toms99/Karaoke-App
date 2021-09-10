var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId
var database = require('../public/javascripts/DataBaseInterface');
const { BlobServiceClient } = require('@azure/storage-blob');
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=soakaraokestorage;AccountKey=DRhzPgINTEWI8IeQ9MjMBQol/vEnLbECZDYI53+2yCkQAT8qva6BbbUnFWhaqkA/t4H6omWvlJ1bobcR7O8ETg==;EndpointSuffix=core.windows.net";


/**
 * Endpoint para obtener todas las canciones
 */
router.get('/', async function(req, res, next) {
  try{
    let query = { owner: { $in: ["public", req.query.user] } };
    let data = await database.songs.find(query)
    let songs = []
    await data.forEach(song => {
      songs.push(song)
    });
    res.jsonp(songs);
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({error});
  }
});

/** 
 * Endpoint para obtener una cancion
 */
 router.get('/:id', async function(req, res, next) {
  try{
    let query = {_id: new ObjectId(req.params.id)}
    let song = await database.songs.findOne(query);
    res.jsonp(song);
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({error});
  }
});

/**
 * Endpoint para editar una cancion
 */
router.put('/:id', async function(req, res, next) {
    try{
      const id = req.params.id
      const result = await database.songs.updateOne({_id: new ObjectId(id)},{"$set":req.body})
      if(result.modifiedCount === 1 ){
        res.jsonp({message:"Successfully edited one song.", result});
      }else{
        res.status(404).jsonp({message:"No songs matched the query. Edited 0 songs.", result});
      }
    }catch(error){
      console.log(error)
      res.status(500).jsonp({error});
    }
  
});


/**
 * Endpoint para subir una cancion
 */
router.post('/', async function(req, res, next) {
  try{
    delete req.body._id
    let result = await database.songs.insertOne(req.body)
    if(result.acknowledged){
      res.status(201).jsonp({message:"Successfully added one song.", _id: result.insertedId});
    }else{
      res.status(500).jsonp({message:"An error ocurred. The song was not uploaded", result});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({error});
  }
});


/**
 * Endpoint para eliminar una cancion
 */
router.delete('/:id', async function(req, res, next) {
  try{
    // Se busca la cancion en la base de datos
    let data = await database.songs.find({_id: new ObjectId(req.params.id)})
    let song
    await data.forEach(file => {
      song = file
    });
    // Se elimina la cancion del almacenamiento de azure
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(song.owner)
    containerClient.deleteBlob(song.filename)

    if(!req.query.storageonly){
      // Se elimina la cancion de la base de datos
      const result = await database.songs.deleteOne({_id: new ObjectId(req.params.id)})
      if(result.deletedCount === 1){
        res.jsonp({message:"Successfully deleted one song.", result});
      }else{
        res.status(404).jsonp({message:"No songs matched the query. Deleted 0 songs.", result});
      } 
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({error});
  }
});


module.exports = router;
