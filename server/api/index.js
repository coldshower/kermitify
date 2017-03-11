var express = require('express');
var router = express.Router();
var db = require('../db');
var Meme = db.model('meme');

router.get('/memes', function (req, res, next) {

  if (Object.keys(req.query).length === 0) {

    Meme.findAll()
    .then(function (memes) {
      res.json(memes);
    })
    .catch(next);

  } else {
    Meme.findOne({
      where: req.query
    })
    .then(function (meme) {
      res.json(meme);
    })
    .catch(next);
  }
  
});

router.post('/memes', function (req, res, next) {
  console.log('REQBODY', req.body);
  Meme.create(req.body)
  .then(function (meme) {
    res.json(meme);
  })
  .catch(next);
});

module.exports = router;