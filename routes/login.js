var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', forward, errorHandler);

function forward(req, res, next) {
	return connect().then(function(db) {
		db.collection('users').findOne({_id: req.query.username}, {_id: 0, password: 1, admin: 1})
			.then(function(response) {
				db.close();
				if(response.password === req.query.password)
					res.status(200).send(response.admin);
				else
					res.status(400).end();
				//next();
			})
			.catch(function(err) {
				next(err);
			});
	}).catch(function(err) {
		next(err);
	});

}

function errorHandler(err, req, res, next) {
	//next(err);
	res.status(400).end();
}

module.exports = router;