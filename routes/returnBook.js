var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', forward, errorHandler);

function forward(req, res, next) {
	return connect().then(function(db) {
		return db.collection('checkOutList').update({_id: req.query.username}, {"$pull": {books: {_id: req.query.isbn}}})
			.then(function(result) {
				return db.collection('bookList').update({_id: req.query.isbn}, {"$inc": {available: 1}}).then(function(result) {
					db.close();
					res.status(200).end();
				});
			});
	}).catch(function(err) {next(err)});
}

function errorHandler(err, req, res, next) {
	//next(err);
	console.log(err);
	res.status(400).end();
}

module.exports = router;