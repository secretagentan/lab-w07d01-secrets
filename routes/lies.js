var express = require('express');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets_app';
var collection = 'lies';
var router = express.Router();

// render lies in handlebars
router.get('/', function(req, res) {
  mongo.connect(url, function(err, db) {
    db.collection(collection).find({}).toArray(function(err, lies) {
      db.close();
      res.render('./lies/index', {lies: lies});
    });
  });
});

//  Insert lies
router.post('/', function(req, res) {
  var newLie = {
    statement: req.body.lie,
    truth: req.body.truth
  };
  mongo.connect(url, function(err, db) {
    db.collection(collection).insert(newLie, function(err, lies) {
      db.close();
      // res.render('lies-new', {lies: newLie})
    })
  })
  res.redirect(301, '/lies');
})

router.get('/new', function(req, res) {
  res.render('./lies/new');
})

router.get('/lies/:liesID/edit', function(req, res) {
  var id = req.params.liesID;
  mongo.connect(url, function(err, db) {
    db.collection(collection).find({_id: ObjectID(id)}).toArray(function(err, lie) {
      res.render('./lies/edit', {lie: lie})
    })
  })
})







module.exports = router;
