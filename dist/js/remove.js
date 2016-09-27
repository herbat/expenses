module.exports = function (id, callback) {
    'use strict';
    var mongo  = require('mongodb').MongoClient,
        url    = 'mongodb://localhost:27017/expenses';

    mongo.connect(url, (err, db) => {
        if(err) { db.close(); return;}
        console.log('deleting started');
        db.collection('records').remove({_id:id}, (err, data) => {
            if(err) {db.close(); return console.log(err);}
            console.log('deleted successfully', id);
            db.close();
            callback(data);
        });
    });
};
