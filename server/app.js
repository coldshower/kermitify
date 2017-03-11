var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var db = require('./db');

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '../public/')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./api'));

app.get('/*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

db.sync()
.then(function () {
  app.listen(3000, function () {
    console.log('Listening on port ' + 3000);
  });
})
.catch(console.error);