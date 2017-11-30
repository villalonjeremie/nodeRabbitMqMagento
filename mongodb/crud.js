"use strict";
var assert = require("assert");

class Crud{
  constructor(props) {
    this.props = props;
   }
  
  findDocuments(db, collectionName) {
    return new Promise((resolve,reject) => {
      this.isTypeString(collectionName);
      var collection = db.collection(collectionName);
      var collectionNameDb= collection.find({}).toArray((err, results) => { 
        if(err){
          reject('error : ' + err);
        }
        resolve(results);   
      });
    }).then(results => {   
      console.log("Found the following records");
      console.log(results);
    }).catch( err => {
      console.log(err); 
    });
  }

  insertDocuments(db, collectionName, arrayValue) {
    return new Promise((resolve,reject) => {
      this.isTypeString(collectionName);
      this.isTypeArray(arrayValue);
      var collection = db.collection(collectionName);
      collection.insertMany(arrayValue,(err, results) => {
        if(err){
          reject('error : ' + err);
        }
        resolve(results);  
      });
    }).then(results => {
      console.log("Documents inserted");
      console.log(results);
    }).catch( err => {
      console.log(err); 
    });
  }

// change => { a : 2 }; set => { b : 1 } 
  updateDocument(db, collectionName, change, set) {
    return new Promise((resolve,reject) => {
      this.isTypeString(collectionName);
      var collection = db.collection(collectionName);
      collection.updateOne(change, { $set: set }, (err, result) => {
        if(err){
          reject('error : ' + err);
        }
        resolve(results);  
      });
    }).then(results => {
      console.log("Document updated");
      console.log(results);
    }).catch( err => {
      console.log(err); 
    });
  }

//deletevalue => { a : 3 }
  deleteOneDocument(db, collectionName, deletevalue) {
    return new Promise((resolve,reject) => {
      this.isTypeString(collectionName);
      var collection = db.collection(collectionName);
      collection.deleteOne(deletevalue, (err, result) => {
        if(err){
          reject('error : ' + err);
        }
        resolve(results);  
      });
    }).then(results => {
      console.log("Document deleted");
      console.log(results);
    }).catch( err => {
      console.log(err); 
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