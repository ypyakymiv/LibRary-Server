var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', forward, errorHandler);

function forward(req, res, next) {
	return connect().then(function(db) {
		return db.collection('bookList').find({"$text": {
					"$search": req.query.q,
					"$caseSensitive": false
				}
			}, {_id: 1, title: 1, author: 1, source: 1}).limit(20).toArray()
				.then(function(response) {
					db.close();
					res.send(JSON.stringify(response));
				}).catch(function(err) {next(err);});
	}).catch(function(err) {next(err)});
}

function errorHandler(err, req, res, next) {
	//next(err);
	console.log(err);
	res.status(400).end();
}

module.exports = router;