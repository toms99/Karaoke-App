var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId
var database = require('../public/javascripts/DataBaseInterface');
var cors = require('cors')
var app = require('../app')
var uuid = require('uuid');
const keycloak = require('../config/keycloak.js').getKeycloak();



router.get('/', keycloak.protect('user'), cors(app.corsOptions), async function(req, res, next) {
  try{
    let query = {}
    if(req.query.user){
      if(req.kauth.grant.access_token.content.preferred_username === req.query.user){
        query.owner = req.query.user;
      }else{
        res.status(403).jsonp({message: "Access Denied to the requested resources"});
        return
      }
    }else{
      query = { owner:"public"};
    }
    if (req.query.artista){
      query.artista=new RegExp(req.query.artista,"i")
    }
    if (req.query.nombre){
      query.nombre=new RegExp(req.query.nombre,"i")
    }
    if (req.query.album){
      query.album=new RegExp(req.query.album,"i")
    }
    if (req.query.letraCruda){
      query.letraCruda=new RegExp(req.query.letraCruda,"i")
    }

    let data = await database.songs.find(query)
    let songs = []
    await data.forEach(song => {
        songs.push(song)
      });
      console.log(songs)
      songs = songs.slice(req.query.offset).slice(0,req.query.limit);
      res.jsonp(songs);
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({message:"Internal Server Error"});
  }
});


 router.get('/:id',  keycloak.protect('user'), cors(app.corsOptions), async function(req, res, next) {
  try{
    let query = {_id: new ObjectId(req.params.id)}
    let song = await database.songs.findOne(query);
    if(song ){
      if(req.kauth.grant.access_token.content.preferred_username === song.owner || song.owner === "public"){
        res.jsonp(song);
      }else{
        res.status(403).jsonp({message: "Access Denied to the requested resources"});
        return
      }
    }else{
      res.status(404).jsonp({message:"No songs matched the id"});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({message:"Internal Server Error"});
  }
});



  router.put('/:id',  keycloak.protect('premium'), cors(app.corsOptions), async function(req, res, next) {
    try{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      delete req.body._id
      delete req.body.url
      delete req.body.owner
      delete req.body.filename
      if(req.body.letra){
        req.body.letraCruda = "";
        req.body.letra.forEach(content => req.body.letraCruda +=" "+ content.words)
      }  
      let song = await database.songs.findOne(query);
      if(song ){
        if(req.kauth.grant.access_token.content.preferred_username === song.owner){
          const result = await database.songs.updateOne(query,{"$set":req.body})
          if(result.matchedCount === 1 ){
            res.jsonp({message:"Successfully edited one song.", result});
          }else{
            res.status(404).jsonp({message:"No songs matched the query. Edited 0 songs.", result});
          }       
        }else{
          res.status(403).jsonp({message: "Access Denied to the requested resources"});
          return
        }
      }else{
        res.status(404).jsonp({message:"No songs matched the query. Edited 0 songs."});
      }
    }catch(error){
      console.log(error)
      res.status(500).jsonp({message:"Internal Server Error"});
    }
  
});




 router.post('/',  keycloak.protect('premium'), cors(app.corsOptions), async function(req, res, next) {
  try{
    const query = {username: req.body.owner}
    const user = await database.users.findOne(query);
    delete req.body._id
    req.body.owner = req.kauth.grant.access_token.content.preferred_username
    req.body.filename = uuid.v1();
    req.body.url = 'https://soakaraokestorage.blob.core.windows.net/'+req.body.owner+'/'+req.body.filename+"?"+user.key
    if(req.body.letra){
      req.body.letraCruda = "";
      req.body.letra.forEach(content => req.body.letraCruda +=" "+ content.words)
    }
    let result = await database.songs.insertOne(req.body)
    if(result.insertedId){
      res.status(201).jsonp({message:"Successfully added one song.", _id: result.insertedId, filename: req.body.filename});
    }else{
      res.status(502).jsonp({message:"An error ocurred. The song was not uploaded", result});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({message:"Internal Server Error"});
  }
});


router.delete('/:id',  keycloak.protect('premium'), cors(app.corsOptions), async function(req, res, next) {
  try{
    // Se busca la cancion en la base de datos
    let query = {_id: new ObjectId(req.params.id)}
    let song = await database.songs.findOne(query);
    if(song){
      if(req.kauth.grant.access_token.content.preferred_username !== song.owner){
        res.status(403).jsonp({message: "Access Denied to the requested resources"});
        return
      }
    }else{
      res.status(404).jsonp({message:"No songs matched the query. Deleted 0 songs"});
      return
    }
    // Se elimina la cancion de la base de datos
    const result = await database.songs.deleteOne({_id: new ObjectId(req.params.id)})
    if(result.deletedCount === 1){
      res.jsonp({message:"Successfully deleted one song", result});
    }else{
      res.status(404).jsonp({message:"The song was not deleted.", result});
    } 
  }
  catch(error){
    res.status(500).jsonp({message:"Internal Server Error"});
  }
});


module.exports = router;
router.options('/', cors(app.corsOptions)) // enable pre-flight request for DELETE request
router.options('/:id', cors(app.corsOptions)) // enable pre-flight request for DELETE request
