const request = require('supertest');
const app = require('../app');
const requesthttp = require('../routes/users').request; 
const expect = require("chai").expect;
const server = require('../bin/www');
var DataBaseInterface = require('../public/javascripts/DataBaseInterface');
const qs = require('qs')

var token = ""

/**
 * Tiempo de espera para la conexion a la base de datos
 */
before(
    function(done) {
        let data =  {
            grant_type:"password",
            client_id:"karaoke-client",
            client_secret:"ba2939cf-e64c-4706-b578-349675e249b4",
            username:"test",
            password:"testpassword"
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
        
        requesthttp(data,options,function(d){
            token = "bearer " + d.access_token
            setTimeout(done, 1500);
        })

    },
    function(done) {
    }
);

/**
 * Tests de GET /songs
 */
describe('GET /songs', function () {
    /**
     * Se verifica que se obtiene un array que contiene un array de canciones
     */
    it('Obtain public songs', function (done) {
        request(app)
            .get('/songs')
            .set('Accept', 'application/json')
            .set('Authorization', token )
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body[0]).to.have.property("_id");
                expect(res.body[0]).to.have.property("nombre");
                expect(res.body[0]).to.have.property("artista");
                expect(res.body[0]).to.have.property("album");
                expect(res.body[0]).to.have.property("url");
                done();
            })
            .catch((err) => done(err));
    });
});

/**
 * Tests de GET /songs/:id
 */
describe('GET /songs/:id', function () {

    /**
     * Se inserta una cancion directamente a la base de datos
     */
    let insertedId
    before(async () => {
        try {
            let song = {
                "nombre": "nombre",
                "letra": "letra",
                "tipo": "tipo",
                "artista": "artista",
                "album": "album",
                "owner":"test",
                "test":"true"
            }    
            let result = await DataBaseInterface.songs.insertOne(song)
            insertedId = result.insertedId
            } catch (err) {
        console.error(err);
        }
    });      
     
    /**
     * Test de obtencion de cancion
     */
    it('Obtain songs', function (done) {
        request(app)
            .get('/songs/'+insertedId)
            .set('Accept', 'application/json')
            .set('Authorization', token )
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).to.have.property("_id");
                expect(res.body).to.have.property("nombre");
                expect(res.body).to.have.property("letra");
                expect(res.body).to.have.property("artista");
                expect(res.body).to.have.property("album");
                done();
            })
            .catch((err) => done(err));
    });

    /**
     * Se elimina la cancion creada en el test
     */
    after(async () => {
        try {
            await DataBaseInterface.songs.deleteOne({ test: "true" });
        } catch (err) {
            console.error(err);
        }
    });      
});

/**
 * Tests de POST /songs
 */
describe('POST /songs', function () {
    before(async () => {
        try {
          await DataBaseInterface.users.insertOne({ username: "test", key: "test", test:"true"});
        } catch (err) {
          console.error(err);
        }
      });      

    /**
     * Se prueba la creacion de una cancion
     */
    it('Post a song', function (done) {
        let song = {
            "nombre": "nombre",
            "letra": '[{"second": 0,"words": "When I met you in the summer"},{"second": 3,"words": "To my heartbeat sound"},{"second": 7,"words": "We fell in love"}]',
            "tipo": "tipo",
            "artista": "artista",
            "album": "album",
            "owner":"test",
            "test":"true"
        }    
        request(app)
            .post('/songs')
            .send(song)
            .set('Accept', 'application/json')
            .set('Authorization', token )
            .expect(201, done);
    });

    /**
     * Se elimina la cancion creada en el test
     */
    after(async () => {
        try {
          await DataBaseInterface.songs.deleteOne({ test: "true" });
          await DataBaseInterface.users.deleteOne({ test: "true"});
        } catch (err) {
          console.error(err);
        }
      });      
});


/**
 * Tests de PUT /songs
 */
describe('PUT /songs', function () {
    
    /**
     * Se inserta una cancion directamente a la base de datos
     */
    let insertedId
    before(async () => {
        try {
            let song = {
                "nombre": "nombre",
                "letra": '[{"second": 0,"words": "When I met you in the summer"},{"second": 3,"words": "To my heartbeat sound"},{"second": 7,"words": "We fell in love"}]',
                "tipo": "tipo",
                "artista": "artista",
                "album": "album",
                "owner":"test",
                "test":"true"
            }    
            let result = await DataBaseInterface.songs.insertOne(song)
            insertedId = result.insertedId
            } catch (err) {
          console.error(err);
        }
      });      


    /**
     * Test para actualizar una cancion
     */
    it('Update a song', function (done) {
        song = {
            "nombre": "nombre2",
            "letra": '[{"second": 0,"words": "When I met you in the summer"},{"second": 3,"words": "To my heartbeat sound"},{"second": 7,"words": "We fell in love"}]',
        }    
        request(app)
            .put('/songs/'+insertedId)
            .send(song)
            .set('Accept', 'application/json')
            .set('Authorization', token )
            .expect(200, done);
    });

    /**
     * Se elimina la cancion creada para el test
     */
    after(async () => {
        try {
            await DataBaseInterface.songs.deleteOne({ test: "true" });
        } catch (err) {
            console.error(err);
        }
    });      
    
});

/**
 * Tests de DELETE /songs:id
 */
describe('DELETE /songs:id', function () {

    /**
     * Se inserta una cancion directamente a la base de datos
     */
    let insertedId

    before(async () => {
        try {
            let song = {
                "nombre": "nombre",
                "letra": "letra",
                "tipo": "tipo",
                "artista": "artista",
                "album": "album",
                "owner":"test",
                "test":"true"
            }    
            let result = await DataBaseInterface.songs.insertOne(song)
            insertedId = result.insertedId
            } catch (err) {
          console.error(err);
        }
      });      

    /**
     * Se prueba eliminar la cancion insertada anteriormente
     */
    it('Delete a song', function (done) {
        request(app)
            .delete('/songs/'+insertedId)
            .set('Accept', 'application/json')
            .set('Authorization', token )
            .set('Authorization', token )
            .expect(200, done);
    });


    /**
     * Se prueba eliminar una cancion que no existe
     */
    it('Cannot delete a song that does not exist', function (done) {
        request(app)
            .delete('/songs/dfgdfgdf')
            .set('Accept', 'application/json')
            .set('Authorization', token )
            .expect(500, done);
    });
});

