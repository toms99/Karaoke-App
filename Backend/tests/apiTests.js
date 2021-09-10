const request = require('supertest');
const app = require('../app'); 
const expect = require("chai").expect;
const server = require('../bin/www');
var DataBaseInterface = require('../public/javascripts/DataBaseInterface');

/**
 * Tiempo de espera para la conexion a la base de datos
 */
before(
    function(done) {
        setTimeout(done, 1500);
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
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body[0]).to.have.property("_id");
                expect(res.body[0]).to.have.property("nombre");
                expect(res.body[0]).to.have.property("letra");
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
    it('Obtain private songs', function (done) {
        request(app)
            .get('/songs/'+insertedId)
            .set('Accept', 'application/json')
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
    /**
     * Se prueba la creacion de una cancion
     */
    it('Post a private song', function (done) {
        let song = {
            "nombre": "nombre",
            "letra": "letra",
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
            .expect(201, done);
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
     * Test para actualizar una cancion
     */
    it('Update a private song', function (done) {
        song = {
            "nombre": "nombre2",
            "letra": "letra2",
        }    
        request(app)
            .put('/songs/'+insertedId)
            .send(song)
            .set('Accept', 'application/json')
            .expect(200, done);
    });


    /**
     * Test para confirmar que no se puede editar una cancion que no existe
     */
    it('cannot edit a song that does not exist', function (done) {
        let song = {
            "nombre": "vncvn",
            "letra": "cvnbc",
            "tipo": "dsfgs",
            "artista": "jhkjhgk",
            "album": "",
            "owner":"a"
        }
        request(app)
            .put('/songs/61746a9e05dfeff4990dc6ad')
            .send(song)
            .set('Accept', 'application/json')
            .expect(404, done);
    });

    /**
     * Se elimina la cancion creada para el test
     */
    after(async () => {
        try {
            await DataBaseInterface.privateSongs.deleteOne({ test: "true" });
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
            .expect(200, done);
    });


    /**
     * Se prueba eliminar una cancion que no existe
     */
    it('Cannot delete a song that does not exist', function (done) {
        request(app)
            .delete('/songs/dfgdfgdf')
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

