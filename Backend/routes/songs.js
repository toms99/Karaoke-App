var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId
var database = require('../public/javascripts/DataBaseInterface');
const { BlobServiceClient } = require('@azure/storage-blob');
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=soakaraokestorage;AccountKey=DRhzPgINTEWI8IeQ9MjMBQol/vEnLbECZDYI53+2yCkQAT8qva6BbbUnFWhaqkA/t4H6omWvlJ1bobcR7O8ETg==;EndpointSuffix=core.windows.net";
var cors = require('cors')
var app = require('../app')

 /**
 * @swagger
 * tags:
 * name: Songs
 * description: API to manage songs.
 */

/**
 * @swagger
 *    components:
 *        schemas:
 *           Song:
 *             type: object
 *             properties:
 *               _id:
 *                   type: string
 *                   description: El ID del objeto.
 *                   example: 613b14eadd11665197679c14
 *               nombre:
 *                   type: string
 *                   description: El nombre de la cancion.
 *                   example: Despacito
 *               letra:
 *                   type: string
 *                   description: Letra de la cancion
 *               artista:
 *                   type: string
 *                   description: Nombre del artista
 *                   example: The Beatles
 *               album:
 *                   type: string
 *                   description: Album
 *                   example: Nanana
 *               owner:
 *                   type: string
 *                   description: Nombre de usuario del dueño
 *                   example: user123
 *               url:
 *                   type: string
 *                   description: Url en el storage
 *                   example: https://soakaraokestorage.blob.core.windows.net/user1/readme.md
 *               filename:
 *                   type: string
 *                   description: Nombre del archivo
 *                   example: Nombre unico.mp3

*/


 /**
 * @swagger
 * /songs:
 *   get:
 *     tags: [Songs]
 *     summary: Endpoint para obtener las canciones.
 *     description: Endpoint para obtener todas las canciones publicas o privadas.
 *     parameters:
 *       - in: query
 *         name: user
 *         required: false
 *         description: El username del dueño en el cual buscar canciones privadas, si se desean las privadas.
 *         example: user1234
 *         schema:
 *           type: string
 *       - in: query
 *         name: lyrics
 *         required: false
 *         description: Booleano que indica si enviar las letras o no.
 *         example: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Cantidad de elementos a recibir.
 *         example: 2
 *         schema:
 *           type: number
 *       - in: query
 *         name: offset
 *         required: false
 *         description: Numero de elemento por el cual empezar a paginar.
 *         example: 30
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: La lista de canciones.
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Song'
 *       500:
 *         description: Error desconocido.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: object
 *                    description: Error generado.
 * */

router.get('/', cors(app.corsOptions), async function(req, res, next) {
  try{
    let query
    if(req.query.user){
      query = { owner: req.query.user};
    }else{
      query = { owner:"public"};
    }
    let data = await database.songs.find(query)
    let songs = []
    await data.forEach(song => {
      if(req.query.lyrics !== "true"){
        delete song.letra
      }
      songs.push(song)
    });
    console.log(songs)
    songs = songs.slice(req.query.offset).slice(0,req.query.limit);
    res.jsonp(songs);
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({error});
  }
});

 /**
 * @swagger
 * /songs/{id}:
 *   get:
 *     tags: [Songs]
 *     summary: Endpoint para obtener una cancion.
 *     description: Endpoint para obtener una cancion.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Indica el id de la cancion a solicitar.
 *         example: 613b14eadd11665197679c14
 *         schema:
 *           type: string  
 *     responses:
 *       200:
 *         description: La cancion.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Song'
 *       404:
 *         description: No se encontró la canción.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de error
 *                    example: No songs matched the id
 *       500:
 *         description: Error desconocido.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: object
 *                    description: Error generado.
 * */

 router.get('/:id', cors(app.corsOptions), async function(req, res, next) {
  try{
    let query = {_id: new ObjectId(req.params.id)}
    let song = await database.songs.findOne(query);
    if(song ){
      res.jsonp(song);
    }else{
      res.status(404).jsonp({message:"No songs matched the id"});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({error});
  }
});



 /**
 * @swagger
 * /songs/{id}:
 *   put:
 *     tags: [Songs]
 *     summary: Endpoint para editar una cancion.
 *     description: Endpoint para editar una cancion.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Indica el id de la cancion a solicitar.
 *         example: 613b14eadd11665197679c14
 *         schema:
 *           type: string
 *       - in: body
 *         required: true
 *         description: Indica la cancion actualizada.
 *         schema:
 *          $ref: '#/components/schemas/Song'
 *       - in: query
 *         name: updateurl
 *         required: false
 *         description: Indica si se debe de actualizar el url de la cancion con los valores dados.
 *         example: true
 *         schema:
 *           type: bool
 *     responses:
 *       200:
 *         description: Mensaje de exito.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de exito
 *                    example: Successfully edited one song
 *                  result:
 *                    type: object
 *                    description: Respuesta de la base de datos
 *       404:
 *         description: Mensaje de error.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de error
 *                    example: No songs matched the query. Edited 0 songs
 *                  result:
 *                    type: object
 *                    description: Respuesta de la base de datos
 *       500:
 *         description: Error desconocido.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: object
 *                    description: Error generado.
 * */

  router.put('/:id', cors(app.corsOptions), async function(req, res, next) {
    try{
      const id = req.params.id
      if(req.query.updateurl === "true"){
        req.body.url = 'https://soakaraokestorage.blob.core.windows.net/'+req.body.owner+'/'+req.body.filename
      }
      const result = await database.songs.updateOne({_id: new ObjectId(id)},{"$set":req.body})
      if(result.matchedCount === 1 ){
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
 * @swagger
 * /songs:
 *   post:
 *     tags: [Songs]
 *     summary: Endpoint para subir una cancion.
 *     description: Endpoint para subir una cancion.
 *     parameters:
 *       - in: body
 *         required: true
 *         description: Indica la cancion actualizada.
 *         schema:
 *          $ref: '#/components/schemas/Song'
 *     responses:
 *       201:
 *         description: Mensaje de exito.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de exito
 *                    example: Successfully added one song
 *                  _id:
 *                    type: string
 *                    description: Id de la nueva cancion
 *       502:
 *         description: Mensaje de error.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de error
 *                    example: An error ocurred. The song was not uploaded
 *                  result:
 *                    type: object
 *                    description: Respuesta de la base de datos
 *       500:
 *         description: Error desconocido.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: object
 *                    description: Error generado.
 * */

router.post('/', cors(app.corsOptions), async function(req, res, next) {
  try{
    delete req.body._id
    req.body.url = 'https://soakaraokestorage.blob.core.windows.net/'+req.body.owner+'/'+req.body.filename
    let result = await database.songs.insertOne(req.body)
    if(result.acknowledged){
      res.status(201).jsonp({message:"Successfully added one song.", _id: result.insertedId});
    }else{
      res.status(502).jsonp({message:"An error ocurred. The song was not uploaded", result});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({error});
  }
});



 /**
 * @swagger
 * /songs/{id}:
 *   delete:
 *     tags: [Songs]
 *     summary: Endpoint para eliminar una cancion.
 *     description: Endpoint para eliminar una cancion.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Indica el id de la cancion a solicitar.
 *         example: 613b14eadd11665197679c14
 *         schema:
 *           type: string  
 *       - in: query
 *         name: storageonly
 *         required: false
 *         description: Indica si solo se debe de eliminar el archivo del storage.
 *         example: true
 *         schema:
 *           type: bool
 *     responses:
 *       200:
 *         description: Mensaje de exito.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de exito
 *                    example: Successfully deleted one song
 *                  result:
 *                    type: object
 *                    description: Respuesta de la base de datos
 *       404:
 *         description: No se encontró la canción.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de error
 *                    example: No songs matched the query. Deleted 0 songs.
 *                  result:
 *                    type: object
 *                    description: Respuesta de la base de datos
 *       500:
 *         description: Error desconocido.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: object
 *                    description: Error generado.
 * */

router.delete('/:id', cors(app.corsOptions), async function(req, res, next) {
  try{
    // Se busca la cancion en la base de datos
    let data = await database.songs.find({_id: new ObjectId(req.params.id)})
    let song
    await data.forEach(file => {
      song = file
    });
    // Se elimina la cancion del almacenamiento de azure
    let storageDeleteError = false 
    try{
      const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
      const containerClient =  blobServiceClient.getContainerClient(song.owner)  
      await containerClient.deleteBlob(song.filename)
    }catch(e){
      storageDeleteError = true
    }
    if(req.query.storageonly !== "true"){
      // Se elimina la cancion de la base de datos
      const result = await database.songs.deleteOne({_id: new ObjectId(req.params.id)})
      if(result.deletedCount === 1){
        if(storageDeleteError){
          res.jsonp({message:"Successfully deleted one song from the database but not from the storage", result});
        }else{
          res.jsonp({message:"Successfully deleted one song", result});
        }
      }else{
        if(storageDeleteError){
          res.status(404).jsonp({message:"No songs matched the query. Deleted 0 songs.", result});
        }else{
          res.jsonp({message:"No songs deleted from the database. One song deleted from the storage", result});
        }
      } 
    }else{
      if(storageDeleteError){
        res.status(404).jsonp({message:"No file matched the song. Deleted 0 files"});
      }else{
        res.jsonp({message:"Successfully deleted one song from the storage."});
      }
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({error});
  }
});


module.exports = router;
