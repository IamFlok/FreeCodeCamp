/*
Here we will learn how to search for documents.

In this exercise the database name is learnyoumongo.
So, the url would be something like: mongodb://localhost:27017/learnyoumongo

Use the parrots collection to find all documents where age
is greater than the first argument passed to your script.

Using console.log, print the documents to stdout.
*/

var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learnyoumongo';
var age = process.argv[2];

mongo.connect(url, (err, db) => {
    if (err) throw err;

    var parrots = db.collection('parrots');
    parrots.find({
        age: {$gt: +age}
    }).toArray((err, docs) => {
        if (err) throw err;
        console.log(docs);
        db.close();
    });
});
