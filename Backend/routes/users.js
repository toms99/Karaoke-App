var express = require('express');
var router = express.Router();
var cors = require('cors')
var app = require('../app');
var {getData, postData} = require('../public/javascripts/httpInterface');
const keycloak = require('../config/keycloak.js').getKeycloak();

const qs = require('qs')
const https = require('http');
const usersHost = ''
const keycloakHost = ''

router.post('/login',  cors(app.corsOptions), async function(req, res){
try{
    let username = req.body.username
    let password = req.body.password
    let body = {username, password}
    let headers = {"Authorization":req.headers.authorization}
    let token
    postData(keycloakHost+'/users/login', body, headers).then(function(response){
      token = response.token
    }).catch(function(error) {
      res.status(401).jsonp(error.message)
      return
    });
    getData(usersHost+'/users/:'+username, headers).then(function(response){
      let userData = {username, key: response.key, rol: user.rol, token}
      res.status(200).jsonp(userData)
    }).catch(function(error) {
      res.status(401).jsonp(error.message)
      return
    });
  }
  catch(error){
    res.status(500).jsonp({message: "Internal Server Error"});
  }
});


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
  
  router.options('/login', cors(app.corsOptions)) // enable pre-flight request for DELETE request
  router.options('/', cors(app.corsOptions)) // enable pre-flight request for DELETE request
