var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', forward, errorHandler);

function forward(req, res, next) {
	return connect().then(function(db) {
		return db.collection('bookList').aggregate([{"$sample": {size: 1}}]).toArray()
			.then(function(result) {
				db.close();
				console.log(result);
				res.status(200).send(result[0]._id);
				return;
		}).catch(function(err) {next(err);});
	}).catch(function(err) {next(err);});
}

function errorHandler(err, req, res, next) {
	//next(err);
	res.status(400).end();
}

module.exports = router;