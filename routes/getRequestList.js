var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', forward, errorHandler);

function forward(req, res, next) {
	return connect().then(function(db) {
		return db.collection('requestList').find({books: {"$ne": []}}, {_id: 1, books: 1}).toArray()
			.then(function(response) {
				db.close();
				res.status(200).send(JSON.stringify(response));
			})
			.catch(function(err) {next(err);});
	}).catch(function(err) {next(err)});
}

function errorHandler(err, req, res, next) {
	//next(err);
	console.log(err);
	res.status(400).end();
}

module.exports = router;