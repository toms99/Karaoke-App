var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerJsdoc = require("swagger-jsdoc")
var swaggerUi = require("swagger-ui-express");
const keycloak = require('./config/keycloak.js').initKeycloak();
var session = require('express-session');

var songsRouter = require('./routes/songs');
var usersRouter = require('./routes/users');

var DataBaseInterface = require('./public/javascripts/DataBaseInterface');
var corsOptions = {
  origin: ['http://localhost:4200/', 'http://168.62.39.210:3000/'],
  optionsSuccessStatus: 200
}

var app = express();

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(keycloak.middleware());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// app.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Karaoke TEC',
        version: '1.0.0',
        description:
            'Aplicacion para hacer CRUD de las canciones y autenticar al usuario',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var testController = require('./routes/testcontroller.js');
app.use('/test', testController);
app.use('/songs', songsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  
  // Se conecta a la base de datos
  DataBaseInterface.connect()
  module.exports = app;
  module.exports.corsOptions = corsOptions;