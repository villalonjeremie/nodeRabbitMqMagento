#!/usr/bin/env node

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var Crud = require('./crud.js');

class Connect{
	constructor(data) {
		this.action = data.action;
		this.collection = data.collection;
		this.url = data.url;
		this.db = data.db;
		this.insert = data.insert;
		this.updateOne = data.updateOne;
		this.deleteOne = data.deleteOne;
	}

	actionToDb() {
		var _this = this;
		MongoClient.connect(_this.url, function(err, db) {
		assert.equal(null, err);
		console.log("Connecté à la base de données 'Mongo'");
		switch (_this.action) {
			case 'findDocuments':
			    _this.findDocuments(db,_this.collection);
			    break;
			case 'insertDocuments':
			    _this.insertDocuments(db,_this.collection,_this.insert);
			    break;
			case 'updateDocument':
			    _this.updateDocument(db, _this.collection, _this.updateOne.change, _this.updateOne.set);
			    break;
			case 'deleteOneDocument':
			    _this.deleteOneDocument(db,_this.collection, _this.deleteOne);
			    break;
			default:
			    _this.errorReport();
			    break;
			}
		});
	}

	findDocuments(db,collection){
		let crud = new Crud();
		crud.findDocuments(db, collection, function(){
			db.close();
		});
	}

	insertDocuments(db,collection,data) {
		let crud = new Crud();
		crud.insertDocuments(db, collection, data , function(){
			crud.findDocuments(db, collection, function(){
				db.close();
			});
		});
	}

	updateDocument(db, collection, changevalue, set) {
		let crud = new Crud();
		crud.updateDocument(db, collection , changevalue, set, function(){
			crud.findDocuments(db, collection, function(){
				db.close();
			});
		});
	}

	deleteOneDocument(db, collection, deletevalue) {
		let crud = new Crud();
		crud.deleteOneDocument(db, collection, deletevalue, function(){
			crud.findDocuments(db, collection, function(){
				db.close();
			});
		});
	}

	errorReport(){
		console.log('No actions defined');
	}

}

module.exports = Connect; 



