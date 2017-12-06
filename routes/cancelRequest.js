var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', forward, errorHandler);

function forward(req, res, next) {
	if(req.query.username && req.query.isbn);
	else
		res.status(400).end();

	return connect().then(function(db) {
		return db.collection('requestList').update({_id: req.query.username}, {"$pull": {books: {_id: req.query.isbn}}})
			.then(function(response) {
				db.close();
				res.status(200).end();
			}).catch(function(err) {next(err);});
	}).catch(function(err) {next(err);});

}

function errorHandler(err, req, res, next) {
	//next(err);
	res.status(400).end();
}

module.exports = router;