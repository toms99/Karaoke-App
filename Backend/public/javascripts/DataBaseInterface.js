const MongoClient = require('mongodb').MongoClient
const connectionString =  'mongodb://admin:teamsoa@168.62.39.210:27017/karaoke'

/**
 * Clase para comunicarse con la base de datos
 */
class DataBaseInterface{
    /**
     * Variables para acceder a las colecciones de la base de datos
     */
    static songs = null

    /**
     * Metodo para inicializar la conexion con la base de datos
     */
    static connect(){
        
        MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then(client => {
          console.log('Connected to Database')
          const db = client.db("karaoke")
          DataBaseInterface.songs = db.collection('Songs')
      }).catch(e=> console.log(e))      
    }
}

module.exports = DataBaseInterface