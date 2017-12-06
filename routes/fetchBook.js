var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
//var me = require('mongo-escape').escape;
var connect = require('./Services');

var router = express.Router();

router.get('/', generateSuggested, forward, errorHandler);

function generateSuggested(req, res, next) {
	return connect().then(function(db) {
		return db.collection('bookList').aggregate({"$sample": {size: 3}}).toArray()
			.then(function(result) {
				db.close();
				res.locals.suggestions = 
					[
						{ _id: result[0]._id, source: result[0].source },
						{ _id: result[1]._id, source: result[1].source },
						{ _id: result[2]._id, source: result[2].source }
					];
				next();
		}).catch(function(err) {next(err)});
	}).catch(function(err) {next(err);});
}


function forward(req, res, next) {
	if(req.query.isbn);
	else
		res.status(400).end();

	return connect().then(function(db) {
		return db.collection('bookList').findOne({_id: req.query.isbn})
			.then(function(response) {
				db.close();
				if(response === null) {
					next('isbn undefined');
					return;
				}
				response.suggestions = res.locals.suggestions;
				res.status(200).send(JSON.stringify(response));
			}).catch(function(err) {next(err);});
			
	}).catch(function(err) {next(err);});

}

function errorHandler(err, req, res, next) {
	//next(err);
	res.status(400).end();
}

module.exports = router;