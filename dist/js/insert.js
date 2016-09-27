module.exports = function (input, callback) {
    'use strict';
    var mongo  = require('mongodb').MongoClient,
        url    = 'mongodb://localhost:27017/expenses';
    mongo.connect(url, (err, db)=>{
        db.collection('records').insert(input, (err) => {
            if (err) { console.log(err); db.close(); }
            else { db.close(); callback(); }
        });
    });
};
