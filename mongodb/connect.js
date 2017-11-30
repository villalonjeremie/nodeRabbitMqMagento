#!/usr/bin/env node

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var Crud = require('./crud.js');
var crud = new Crud();

class Connect{
	constructor(data) {
		this.collection = data.collection;
		this.url = data.url;
		this.db = data.db;
		this.insert = data.insert;
		this.updateOne = data.updateOne;
		this.deleteOne = data.deleteOne;
	}

	actionToDb(data) {
		return new Promise((resolve,reject) => {
			this.insert = data.insert;
			this.updateOne = data.updateOne;
			this.deleteOne = data.deleteOne;
			var self = this;

			console.log('actionDbDEbut');

			MongoClient.connect(self.url, (err, db) => {
				console.log("Connecté à la base de données 'Mongo'");

				if(err){
					reject(err);
				}

				switch (self.action) {
					case 'findDocuments':
					    resolve(self.findDocuments(db,self.collection));
					    break;
					case 'insertDocuments':
					    resolve(self.insertDocuments(db,self.collection,self.insert));
					    break;
					case 'updateDocument':
					    resolve(self.updateDocument(db, self.collection, self.updateOne.change, self.updateOne.set));
					    break;
					case 'deleteOneDocument':
					    resolve(self.deleteOneDocument(db,self.collection, self.deleteOne));
					    break;
					default:
					    reject('No actions defined');
					    break;
				};
			});
		})
		.then(() => {
			console.log('actionDbFin');
		})
		.catch( err => {
			console.log('err : ' + err); 
		});;
	}

	findDocuments(db,collection){
		return new Promise((resolve,reject) => {
			resolve(crud.findDocuments(db, collection));
		}).then(() => {
			console.log('connection close');
			db.close();
		});
	}

	insertDocuments(db,collection,data) {
		return new Promise((resolve,reject) => {
			resolve(crud.insertDocuments(db, collection, data));
		}).then(() => {
			return crud.findDocuments(db,collection);
		}).then(() => {
			console.log('connection close');
			db.close();
		});
	}

	updateDocument(db, collection, changevalue, set) {
		return new Promise((resolve,reject) => {
			resolve(crud.updateDocument(db, collection , changevalue, set));
		}).then(() => {
			return crud.findDocuments(db,collection);
		}).then(() => {
			console.log('connection close');
			db.close();
		});
	}

	deleteOneDocument(db, collection, deletevalue) {
		return new Promise((resolve,reject) => {
			crud.deleteOneDocument(db, collection, deletevalue);
		}).then(() => {
			return crud.findDocuments(db,collection);
		}).then(() => {
			console.log('connection close');
			db.close();
		});
	}

    remove(){
        delete this;
    }
}

module.exports = Connect; 



