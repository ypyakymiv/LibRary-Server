var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', forward, errorHandler);

function forward(req, res, next) {
	if(req.query.username && req.query.password && req.query.email && req.query.number);
	else
		res.status(400).end();

	return connect().then(function(db) {
		db.collection('users').insert(
			{
				_id: req.query.username,
				password: req.query.password, 
				email: req.query.email, 
				number: req.query.number, 
				admin: false
			})
			.then(function(response) {
				db.close();
				res.status(200).end();
				//next();
			});
	}).catch(function(err) {
		next(err);
	});

}

function errorHandler(err, req, res, next) {
	//next(err);
}

module.exports = router;