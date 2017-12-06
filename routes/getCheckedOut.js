var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', forward, errorHandler);

function forward(req, res, next) {
	if(req.query.username);
	else{
		res.status(400).end();
		return;
	}

	return connect().then(function(db) {
		return db.collection('checkOutList').findOne({_id: req.query.username}, {_id: 0, books: 1})
			.then(function(response) {
				db.close();
				if(response === null) {
					next('invalid username');
					return;
				}
				res.status(200).send(JSON.stringify(response.books));
				return;
			}).catch(function(err) {next(err);});
			
	}).catch(function(err) {next(err);});

}

function errorHandler(err, req, res, next) {
	//next(err);
	res.status(400).end();
}

module.exports = router;