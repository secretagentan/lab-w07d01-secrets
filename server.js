var express = require('express');
var bodyParser = require('body-parser');
var hbs  = require('express-handlebars');

// db
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets_app';
var collection = 'secrets';

var app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  mongo.connect(url, function(err, db) {
    db.collection(collection).find({}).toArray(function(err, secrets) {
      db.close();
      res.render('index', {secrets: secrets});
    });
  });
});

app.post('/secrets/:id/likes', function(req, res) {
  var id = req.params.id;
  mongo.connect(url, function(err, db) {
    db.collection(collection).findAndModify(
      {_id: ObjectID(id)},
      {},
      {$inc: {likes: 1}},
      {new: true},
      function(err, result) {
        db.close();
        res.json(result);
      });
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
