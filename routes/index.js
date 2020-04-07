var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url= "mongodb+srv://dbUser:dbUserPassword@mycluster-rvwj9.mongodb.net/test?retryWrites=true&w=majority";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET colchones data. */
router.get('/get-data',function(req, rest, next){
	var resultArray = [];
	//Connect to the db
	mongo.connect(url, function (err, db){
		assert.equal(null, err);
		//Select "colchones" collection
		var cursor = db.collection('colchones').find();
		//Obtain all the objects
		cursor.forEach(function(doc, err){
			assert.equal(null, err);
			//Push the objects to an Array
			resultArray.push(doc);			
		}, function() {
			db.close();
			res.render('index', {items: resultArray});
		});
	});
});
/* POST colchon data. */
router.post('/insert',function(req, rest, next){
	//Create the object "colchon" with the specific data
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	}
	//Connect to the db
	mongo.connect(url, function(err, db) {
		assert.equal(null, err);
		//Insert the object
		db.collection('colchones').insertOne(item, function(err, result){
			assert.equal(null, err);
			console.log('Item inserted');
			db.close();
		});
	});
	//Redirect to the home page
	res.redirect('/');
});
//Update the object
router.post('/update',function(req, rest, next){
	// ...
});
//Delete the object
router.post('/delete',function(req, rest, next){
	// ...
});

module.exports = router;
