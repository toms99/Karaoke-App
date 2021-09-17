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
        client_id:"nodejs-microservice",
        client_secret:"0ab3d1dc-5d96-4fe8-9852-258a558be4cd",
        username:"creator",
        password:"creator1"
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
    console.log(`statusCode: ${rest.statusCode}`)
    let s=""
    rest.on('data',  d => {
        s =  JSON.parse(d.toString());
            process.stdout.write(d);
        })

        rest.on('end', function () {
            callback(s.access_token)
          });
    })
    
    reqs.on('error', error => {
        s=error
        console.error(error)
    })
    reqs.write(data)
    reqs.end()
}

function create_user(username,token,callback){
    let data =  {
        enabled:"true", username
      }
    data= JSON.stringify(data)
    const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/auth/admin/realms/Karaoke-Realm/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    }
    }
    const reqs =  https.request(options,  rest => {
    console.log(`statusCode: ${rest.statusCode}`)
    let s=""
    rest.on('data',  d => {
        s =  JSON.parse(d.toString());
            process.stdout.write(d);
        })

        rest.on('end', function () {
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

function get_userid(username,token,callback){
    let data =  {}
    data= JSON.stringify(data)

    const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/auth/admin/realms/Karaoke-Realm/users?username='+username,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    }
    }
    
    const reqs =  https.request(options,  rest => {
    console.log(`statusCode: ${rest.statusCode}`)
    let s=""
    rest.on('data',  d => {
        s =  JSON.parse(d.toString());
            process.stdout.write(d);
        })

        rest.on('end', function () {
            callback(s[0].id)
          });
    })
    
    reqs.on('error', error => {
        s=error
        console.error(error)
    })
    reqs.write(data)
    reqs.end()
    

}

function set_rol(userid,rol,token,callback){
    let data = []
    if (rol =="user") {
        data =  [{
            id:"fa1e9362-4dc4-4b65-ba98-b9e774b49516", name:"app-user"
          }]
    }else if (rol == "premium"){
        data =  [{
            id:"fa1e9362-4dc4-4b65-ba98-b9e774b49516", name:"app-user"
          }]
    }

    data= JSON.stringify(data)
    const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/auth/admin/realms/Karaoke-Realm/users/'+ userid+'/role-mappings/realm',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    }
    }
    
    const reqs =  https.request(options,  rest => {
    console.log(`statusCode: ${rest.statusCode}`)
    let s=""
    rest.on('data',  d => {
        s =  JSON.parse(d.toString());
            process.stdout.write(d);
        })

        rest.on('end', function () {
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

function set_password(userid,password,token,callback){

    let data =  { type: "password", temporary: false, value: password }

    data= JSON.stringify(data)
    const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/auth/admin/realms/Karaoke-Realm/users/'+ userid+'/reset-password',
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    }
    }
    
    const reqs =  https.request(options,  rest => {
    console.log(`statusCode: ${rest.statusCode}`)
    let s=""
    rest.on('data',  d => {
        s =  JSON.parse(d.toString());
            process.stdout.write(d);
        })

        rest.on('end', function () {
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







router.get('/admin', keycloak.protect('admin'), function(req, res){
    res.send("Hello Admin");
});

router.get('/all-user', keycloak.protect(['user','admin']), function(req, res){
    res.send("Hello All User");
});

module.exports = router;