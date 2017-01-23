var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sandbox';
var collection = 'secrets';

var secrets = [
  {message: 'i let the dogs out', likes: 0},
  {message: 'i have another family in canada', likes: 0},
];

mongo.connect(url, function(err, db) {
  db.collection(collection).remove({}, function(err, result) {
    db.collection(collection).insert(secrets, function(err, result) {
      db.close();
      console.log(result);
      process.exit();
    });
  })
});
