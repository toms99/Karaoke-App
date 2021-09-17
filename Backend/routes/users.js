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
      callback(d.access_token)
    })
    

});

router.post('/create_user', function(req, res){
  get_admin_token(function(token){
      create_user(req.body.username,token,function(rest){
          get_userid(req.body.username,token,function(userid){
              set_rol(userid,req.body.rol,token,function(a){})
              set_password(userid,req.body.password,token,function(b){
                  res.status(200).jsonp(b)
              })
          })
      })

  })

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

  module.exports = router;
