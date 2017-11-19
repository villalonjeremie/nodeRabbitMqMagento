"use strict";
var assert = require("assert");

class Crud{
  constructor(props) {
    this.props = props;
   }
  
  findDocuments(db, collectionName, callback) {
    this.isTypeString(collectionName);
    var collection = db.collection(collectionName);

    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.dir(docs);
      callback(docs);
    });
  }

  insertDocuments(db, collectionName, arrayValue, callback) {
    this.isTypeString(collectionName);
    this.isTypeArray(arrayValue);
    var collection = db.collection(collectionName);

    collection.insertMany(arrayValue, function(err, result) {
      assert.equal(err, null);
      console.log("Insert Many");
      callback(result);
    });
  }

// change => { a : 2 }; set => { b : 1 } 
  updateDocument(db, collectionName, change, set, callback) {
    this.isTypeString(collectionName);
    var collection = db.collection(collectionName);

    collection.updateOne(change, { $set: set }, function(err, result) {
      assert.equal(err, null);
      console.log("Updated the document");
      callback(result);
    });  
  }

//deletevalue => { a : 3 }
  deleteOneDocument(db, collectionName, deletevalue, callback) {
    this.isTypeString(collectionName);
    var collection = db.collection(collectionName);

    collection.deleteOne(deletevalue, function(err, result) {
      assert.equal(err, null);
      console.log("Removed the document");
      callback(result);
    });
  }

  isTypeArray(param){
     if (!(param instanceof Array)) throw Error('invalid argument: param must be an array');
  }

  isTypeString(param){
     if (!(typeof param === 'string' || param instanceof String)) throw Error('invalid argument: param must be an string');
  }
}

module.exports = Crud;