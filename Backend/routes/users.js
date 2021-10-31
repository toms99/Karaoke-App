var express = require('express');
var router = express.Router();
var database = require('../public/javascripts/DataBaseInterface');
var cors = require('cors')
var app = require('../app');


const qs = require('qs')
const https = require('http');

 
router.get('/:username',  cors(app.corsOptions), async function(req, res){
  try{
      let query = {username: req.params.username}
      let user = await database.users.findOne(query);
      if(user ){
        res.status(200).jsonp({username: user.username, key: user.key, rol: user.rol})
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
    let username = req.body.username
    let rol = req.body.rol
    let key = req.body.key
    try{
      // Se verifica si el usuario ya existe en la base de datos
      let user = await database.users.findOne({username});  

      if(user){
        res.status(409).jsonp({message:"The username is already in use."});
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
  
    }catch(error){
      res.status(500).jsonp({error: "Internal Error"});
    }
    
  });

  module.exports = router;
  
  router.options('/login', cors(app.corsOptions)) // enable pre-flight request for DELETE request
  router.options('/', cors(app.corsOptions)) // enable pre-flight request for DELETE request
