var session = require('express-session');
var Keycloak = require('keycloak-connect');


let _keycloak;

var keycloakConfig = {
    clientId: 'nodejs-microservice',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'Karaoke-Realm',
    credentials: {
        secret: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl4g0UgM5FXORV8aw193Fu/VBQ9n2aoFWKuxY7iNXy2zjktcapf2Oxf12j9pxl22WiiM2UC23p3cafj2l6XWRA9d9l/UE9EVLiIZZagmxsRitLfAgLnwv1tdvRo/xycBY/P1RTi7rw8xv/Jlqdj1KYmWgucpEdSwexjcoO7NHBScBQflLYh/GDavJa4Axi4o2BvGZlipXhgOCXTNBYJtN3tOvYqH21eI1fIcoobqF4vXgr4Bs80gBnYkPE4caLy5+sbxfSIfkeZNsuZR346R1AoIzHSM5D4M/DGIMtCsEg2civCsmp+qBRmTWMVbARW9+MQexnexcXN1hbUGq/gri/QIDAQAB'
    }
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("No se ha podido conectar a keycloak, intente de nuevo");
        return _keycloak;
    } 
    else {
        console.log("Iniciando Keycloak");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak no ha sido inicializado');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};