const MongoClient = require('mongodb').MongoClient
const connectionString =  'mongodb+srv://client:HzKRkF8M52TTjidj@cluster0.uaqcj.mongodb.net/test'

/**
 * Clase para comunicarse con la base de datos
 */
class DataBaseInterface{
    /**
     * Variables para acceder a las colecciones de la base de datos
     */
    static users = null

    /**
     * Metodo para inicializar la conexion con la base de datos
     */
    static connect(){
        
        MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then(client => {
          console.log('Connected to Database')
          const db = client.db("users")
          DataBaseInterface.users = db.collection('users')
      }).catch(e=> console.log(e))      
    }
}

module.exports = DataBaseInterface