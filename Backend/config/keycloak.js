var session = require('express-session');
var Keycloak = require('keycloak-connect');


let _keycloak;

var keycloakConfig = {
    clientId: 'karaoke-client',
    bearerOnly: true,
    serverUrl: 'http://168.62.39.210:8080/auth',
    realm: 'Karaoke-Realm',
    credentials: {
        secret: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgiLR91zopFaInWPjJTssSO8pPx3ZtTTzavBfpOw2qExIMRsAgVu7RBMfub+0UcPoQ4+1SMNpqIj9k62ZctuiIsrAAC37J33sT1RKdUOrJDO7Y/Fr/hya6zJ2fChW7OZ/u8fVi4+Ot6eJcrnUMEEP4MlfZdtPiYkxvg7BLQi9mP1E4yukzeCrFgw4ztfLXocbpnVAAvnq98sb1D+/c/W6nEgcRzoSfr2FeVqf+6vH0YGYiJShfTgqynSTZ7hMaBWdYe/q18zpAoBuOougYsXgXzg6puAhg9kOQiotcmNdxbW/NV7/tPaQis3dWFZbxHQrNSDz/oUHq2cBoyGDqEJFqQIDAQAB'
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