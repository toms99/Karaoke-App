var express = require('express');
var router = express.Router();
var database = require('../public/javascripts/DataBaseInterface');
var cors = require('cors')
var app = require('../app');
const { use } = require('chai');
const keycloak = require('../config/keycloak.js').getKeycloak();


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

const qs = require('qs')
const https = require('http');
router.post('/login', function(req, res){
    let data =  {
        grant_type:"password",
        client_id:"nodejs-microservice",
        client_secret:"0ab3d1dc-5d96-4fe8-9852-258a558be4cd",
        username:req.body.username,
        password:req.body.password
      }
    data=qs.stringify(data)
      
    const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/auth/realms/Karaoke-Realm/protocol/openid-connect/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    }
    
    const reqs =  https.request(options,  rest => {
    console.log(`statusCode: ${res.statusCode}`)
    let s=""
    rest.on('data',  d => {
        s =  JSON.parse(d.toString());
            process.stdout.write(d);
        })

        rest.on('end', function () {
            res.status(res.statusCode).jsonp(s)
          });
    })
    
    reqs.on('error', error => {
        s=error
        console.error(error)
    })
    reqs.write(data)
    reqs.end()
    

});



  module.exports = router;
