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
    res.status(500).jsonp({error});
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
    res.status(500).jsonp({error});
  }
});

router.put('/', async function(req, res, next) {
    let songsCollection = database.privateSongs
    let id = req.body._id
    delete req.body._id
    try{
      if(id){
        let result = await songsCollection.updateOne({_id: new ObjectId(id)},{"$set":req.body})
        if(result.modifiedCount === 1 ){
          res.jsonp({message:"Successfully edited one song.", result});
        }else{
          res.jsonp({message:"No songs matched the query. Edited 0 songs.", result});
        }
      }else{
        res.jsonp({message:"The id of the song to update was not provided. No songs were edited"});
      }
    }catch(error){
      console.log(error)
      res.status(500).jsonp({error});
    }
  
});

router.post('/', async function(req, res, next) {
  try{
    let songsCollection = database.privateSongs
    delete req.body._id
    console.log(req.body)
    let result = await songsCollection.insertOne(req.body)
    if(result.acknowledged){
      res.jsonp({message:"Successfully added one song.", _id: result.insertedId});
    }else{
      res.jsonp({message:"An error ocurred. The song was not uploaded", result});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({error});
  }
});

router.delete('/:id', async function(req, res, next) {
  try{
    let songsCollection = database.privateSongs
    const result = await songsCollection.deleteOne({_id: new ObjectId(req.params.id)})
    if(result.deletedCount === 1){
      res.jsonp({message:"Successfully deleted one song.", result});
    }else{
      res.jsonp({message:"No songs matched the query. Deleted 0 songs.", result});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({error});
  }
});


module.exports = router;
