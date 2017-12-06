var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', forward, errorHandler);

function forward(req, res, next) {
	return connect().then(function(db) {
		return db.collection('users').findOne({_id: req.query.username}, {_id: 1, email: 1, number: 1})
				.then(function(response) {
					return db.collection('checkOutList').findOne({_id: req.query.username}, {books: 1})
						.then(function(checkedOut) {
							db.close();
							response.checkedOut = checkedOut.books;
							res.send(JSON.stringify(response));
						});
				}).catch(function(err) {next(err);});
	}).catch(function(err) {next(err)});
}

function errorHandler(err, req, res, next) {
	//next(err);
	console.log(err);
	res.status(400).end();
}

module.exports = router;