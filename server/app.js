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

var port = process.env.PORT || 3000;

db.sync()
.then(function () {
  app.listen(port, function () {
    console.log('Listening on port ' + port);
  });
})
.catch(console.error);