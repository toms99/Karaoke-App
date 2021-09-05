var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var songsRouter = require('./routes/songs');
var DataBaseInterface = require('./public/javascripts/DataBaseInterface');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/songs', songsRouter);

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

// const fs = require('fs');
// const doAsync = require('doasync');


// async function test(data){
//   const { BlobServiceClient } = require('@azure/storage-blob');
//   const { v1: uuidv1} = require('uuid');
//   const connStr = "DefaultEndpointsProtocol=https;AccountName=soakaraokestorage;AccountKey=DRhzPgINTEWI8IeQ9MjMBQol/vEnLbECZDYI53+2yCkQAT8qva6BbbUnFWhaqkA/t4H6omWvlJ1bobcR7O8ETg==;EndpointSuffix=core.windows.net";


//   const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

//   // Create a unique name for the container
//   const containerName = 'privatesongs';

//   // Get a reference to a container
//   const containerClient = blobServiceClient.getContainerClient(containerName);

//   const blobName = 'quickstart' + uuidv1() + '.txt';
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   console.log('\nUploading to Azure storage as blob:\n\t', blobName);
//   // Upload data to the blob

//   const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
//   console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
// }


// doAsync(fs).readFile('./2021-07-27 16-43-07.mkv')
//     .then((data) => test(data));


DataBaseInterface.connect()
module.exports = app;
