var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', forward, errorHandler);

function forward(req, res, next) {
	return connect()
		.then(function(db) {
			return db.collection('requestList').findOne({_id: req.query.username}, {_id: 0, books: 1})
				.then(function(response) {
					db.close();
					if(response)
						;
					else
						next(err);
					res.status(200).send(JSON.stringify(response.books));
				}).catch(function(err) {next(err);});
		}).catch(function(err) {next(err);});

}

function errorHandler(err, req, res, next) {
	//next(err);
	res.status(400).end();
}

module.exports = router;