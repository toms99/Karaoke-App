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



/**
 * @swagger
 *    components:
 *        schemas:
 *           User:
 *             type: object
 *             properties:
 *               _id:
 *                   type: string
 *                   description: El ID del objeto.
 *                   example: 613b14eadd11665197679c14
 *               username:
 *                   type: string
 *                   description: El nombre de usuario.
 *                   example: Despacito
 *               key:
 *                   type: string
 *                   description: La clave para el storage personal del usuario
*/

 /**
 * @swagger
 * /users/{username}:
 *   get:
 *     tags: [Users]
 *     summary: Endpoint para obtener un usuario.
 *     description: Endpoint para obtener un usuario.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Indica el username a solicitar.
 *         example: user1
 *         schema:
 *           type: string  
 *     responses:
 *       200:
 *         description: El usuario.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       404:
 *         description: No se encontró el usuario.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de error
 *                    example: No user found
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

router.get('/:username', cors(app.corsOptions), async function(req, res, next) {
    try{
      let query = {username: req.params.username}
      let user = await database.users.findOne(query);
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


 /**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Endpoint para registrarse.
 *     description: Endpoint para registrarse.
 *     parameters:
 *       - in: body
 *         name: username
 *         required: true
 *         description: Indica el nombre de usuario.
 *         schema:
 *           type: string
 *           example: user1
 *       - in: body
 *         name: password
 *         required: true
 *         description: Indica la contraseña.
 *         schema:
 *           type: string
 *           example: 12345
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
 *                    example: Successfully registered
 *       409:
 *         description: Error de usuario ya existente.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de error
 *                    example: The username is already in use
 *       502:
 *         description: Error externo.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de error
 *                    example: An error ocurred on the creation of the users storage space. The registration was unsuccessful
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
    // Se obtienen los parametros de entrada
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
          let result = await database.users.insertOne({username, key})
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
      res.status(500).jsonp({error: "Internal Error"});
    }
    
  });

  module.exports = router;
