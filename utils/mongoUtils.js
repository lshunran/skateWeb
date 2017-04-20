var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var url = 'mongodb://120.25.76.129:27017/skate';
module.exports = mongoDB;

/**
 * 构造函数
 */
function mongoDB(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}

mongoDB.isOnline = function() {
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            console.log('******************** Connect To MondoDB Successfully! ********************');
        }
    });
    return null;
}

mongoDB.findQuestion = function(collection, queryCondition) {
    var deferred = Q.defer();
    MongoClient.connect(url, function(err, db) {
        console.log(collection);
        db.collection(collection).find(queryCondition).toArray(function(err, result) {
            if (err) {
                console.error(err);
                deferred.resolve(err);
            } else {
                deferred.resolve(result);
            }
            db.close();
        });
    });
    return deferred.promise;
}

mongoDB.insertQuestion = function(collection, docObject, reqObject) {
    var deferred = Q.defer();
    MongoClient.connect(url, function(err, db) {
        db.collection(collection).save(docObject, function(err, result) {
            if (err) {
                console.error(err);
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
            db.close();
        });
    });
    return deferred.promise;
}