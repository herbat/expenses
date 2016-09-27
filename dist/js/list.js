/*jslint node:true */
/*jshint esnext:true */
/*jshint unused:false*/

module.exports = function(query, heads, callback){
    'use strict';
    var mongo  = require('mongodb').MongoClient,
        url    = 'mongodb://localhost:27017/expenses';

    mongo.connect(url, (err, db) => {
        if(err) { db.close(); }
        list(db, (res) => {
            db.close();
            if(callback !== undefined) { callback(res); }
        });
    });

    function list(db, callback) {
        var cursor = db.collection('records').find(query), arr = [], row;

        cursor.each((err,doc) => {
            if (doc === null) {callback(arr); return;}
            row = heads.reduce((prev, current) => {
                if(doc[current] !== undefined) prev.push(doc[current]);
                return prev;
            }, []);
            arr.push(row);
        });
    }

};
