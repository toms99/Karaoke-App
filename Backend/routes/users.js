var express = require('express');
var router = express.Router();
var database = require('../public/javascripts/DataBaseInterface');
const { BlobServiceClient, generateBlobSASQueryParameters, ContainerSASPermissions, StorageSharedKeyCredential} = require('@azure/storage-blob');
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=soakaraokestorage;AccountKey=DRhzPgINTEWI8IeQ9MjMBQol/vEnLbECZDYI53+2yCkQAT8qva6BbbUnFWhaqkA/t4H6omWvlJ1bobcR7O8ETg==;EndpointSuffix=core.windows.net";
var cors = require('cors')
var app = require('../app');
const { use } = require('chai');
const keycloak = require('../config/keycloak.js').getKeycloak();
const accountName = "soakaraokestorage";
const accountKey = "DRhzPgINTEWI8IeQ9MjMBQol/vEnLbECZDYI53+2yCkQAT8qva6BbbUnFWhaqkA/t4H6omWvlJ1bobcR7O8ETg==";
const credential = new StorageSharedKeyCredential(accountName, accountKey)


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

const qs = require('qs')
const https = require('http');


router.post('/login', function(req, res){
    let data =  {
        grant_type:"password",
        client_id:"karaoke-client",
        client_secret:"ba2939cf-e64c-4706-b578-349675e249b4",
        username:req.body.username,
        password:req.body.password
      }
    data=qs.stringify(data)
      
    const options = {
    hostname: '168.62.39.210',
    port: 8080,
    path: '/auth/realms/Karaoke-Realm/protocol/openid-connect/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    }
    
    request(data,options,function(d){
      res.status(200).jsonp({token:d.access_token})
    })
    

});

router.post('/create_user', function(req, res){
})

function get_admin_token (callback){
  let data =  {
      grant_type:"password",
      client_id:"karaoke-client",
      client_secret:"ba2939cf-e64c-4706-b578-349675e249b4",
      username:"creator",
      password:"creator1"
    }
  data=qs.stringify(data)
    
  const options = {
  hostname: '168.62.39.210',
  port: 8080,
  path: '/auth/realms/Karaoke-Realm/protocol/openid-connect/token',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
  }
  }
  request(data,options,function(d){
    callback(d.access_token)
  })

}

function create_user(username,token,callback){
  let data =  {
      enabled:"true", username
    }
  data= JSON.stringify(data)
  const options = {
  hostname: '168.62.39.210',
  port: 8080,
  path: '/auth/admin/realms/Karaoke-Realm/users',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+token
  }
  }
  request(data,options,function(d){
    callback(d)
  })
}

function get_userid(username,token,callback){
  let data =  {}
  data= JSON.stringify(data)

  const options = {
  hostname: '168.62.39.210',
  port: 8080,
  path: '/auth/admin/realms/Karaoke-Realm/users?username='+username,
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+token
  }
  }
  
  
  request(data,options,function(d){
    callback(d[0].id)
  })
  

}

function set_rol(userid,rol,token,callback){
  let data = []
  if (rol =="user") {
      data =  [{
          id:"ee18091d-08be-484e-b7d5-220f4b0a39ed", name:"user_role"
        }]
  }else if (rol == "premium"){
      data =  [{
          id:"6eb321be-8f72-4b1b-8a8c-29c8ea6d84b1", name:"premium-role"
        }]
  }

  data= JSON.stringify(data)
  const options = {
  hostname: '168.62.39.210',
  port: 8080,
  path: '/auth/admin/realms/Karaoke-Realm/users/'+ userid+'/role-mappings/realm',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+token
  }
  }
  
  request(data,options,function(d){
    callback(d)
  })
}

function set_password(userid,password,token,callback){

  let data =  { type: "password", temporary: false, value: password }

  data= JSON.stringify(data)
  const options = {
  hostname: '168.62.39.210',
  port: 8080,
  path: '/auth/admin/realms/Karaoke-Realm/users/'+ userid+'/reset-password',
  method: 'PUT',
  headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+token
  }
  }
  
  request(data,options,function(d){
    callback(d)
  })
}


function request(data,options,callback){
 
  const reqs =  https.request(options,  rest => {
  console.log(`statusCode: ${rest.statusCode}`)
  let s=""
  rest.on('data',  d => {
    s += String(d);
          process.stdout.write(d);
      })

      rest.on('end', function () {
        try {
          s=JSON.parse(s.toString())
        } catch (error) {
          
        }
          callback(s)
        });
  })

  reqs.on('error', error => {
      s=error
      console.error(error)
  })
  reqs.write(data)
  reqs.end()

}


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
    let rol = req.body.rol
    try{
      // Se verifica si el usuario ya existe en la base de datos
      let user = await database.users.findOne({username});  

      if(user){
        res.status(409).jsonp({message:"The username is already in use."});
      }else{

        // Se genera el usuario en keycloak
        await get_admin_token(function(token){
          create_user(req.body.username,token,function(rest){
              get_userid(req.body.username,token,function(userid){
                  set_rol(userid,req.body.rol,token,function(a){})
                  set_password(userid,req.body.password,token,function(b){
                  })
              })
          })
        })
    

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
          let result = await database.users.insertOne({username, key, rol})
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
  module.exports.request = request;