'use strict';
var mongo  = require('mongodb').MongoClient,
    url    = 'mongodb://localhost:27017/expenses',
    query  = {shop: "LIDL"};

mongo.connect(url, (err, db) => {
    if(err) { db.close(); }
    var cursor = db.collection('records').find(query);

    cursor.each((err, doc)=>{
        if (doc === null) {return;}
        console.log(doc.shop);
    });
});
