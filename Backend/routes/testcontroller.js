const { urlencoded } = require('express');
var express = require('express');
var router = express.Router();
const keycloak = require('../config/keycloak.js').getKeycloak();


router.get('/anonymous', function(req, res){
    res.send("Hello Anonymous");
});

router.get('/user', keycloak.protect('user'), function(req, res){

    res.send("Hello User");
});


const qs = require('qs')
const https = require('http');
router.post('/key', function(req, res){
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



router.get('/admin', keycloak.protect('admin'), function(req, res){
    res.send("Hello Admin");
});

router.get('/all-user', keycloak.protect(['user','admin']), function(req, res){
    res.send("Hello All User");
});

module.exports = router;