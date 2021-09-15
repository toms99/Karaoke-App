var express = require('express');
var router = express.Router();
var database = require('../public/javascripts/DataBaseInterface');
var cors = require('cors')
var app = require('../app');
const { use } = require('chai');



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

  module.exports = router;
