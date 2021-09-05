var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId
var database = require('../public/javascripts/DataBaseInterface');

router.get('/', async function(req, res, next) {
  try{
    let data = await database.publicSongs.find()
    let songs = []
    await data.forEach(song => {
      songs.push(song)
    });
    res.jsonp(songs);
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp(error);
  }
});

router.get('/:owner', async function(req, res, next) {
  try{
    let data = await database.privateSongs.find({owner:req.params.owner})
    let songs = []
    await data.forEach(song => {
      songs.push(song)
    });
    res.jsonp(songs);
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp(error);
  }
});

router.put('/', async function(req, res, next) {
  try{
    let songsCollection = database.privateSongs
    let id = req.body._id
    delete req.body._id
    songsCollection.updateOne({_id: new ObjectId(id)},{"$set":req.body})
    res.jsonp({status:"success"});
  }catch(error){
    console.log(error)
    res.status(500).jsonp(error);
  }
});

router.post('/', async function(req, res, next) {
  try{
    let songsCollection = database.privateSongs
    delete req.body._id
    console.log(req.body)
    songsCollection.insertOne(req.body)
    res.jsonp({status:"success"});
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp(error);
  }
});



module.exports = router;
