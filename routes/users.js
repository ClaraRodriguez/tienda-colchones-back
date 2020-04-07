var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
	///....
  res.send('respond with a resource');
});

/* Signup */
router.post('/signup', (req, res, next) => {
	//Find the email of the user
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		//Checks if the emails exists already
		if (user.lenght >= 1){
			return res.status(409).json({
				message: 'Mail exists'
			});
		} else {
			if(err){
				return res.status(500).json({
					error: err
				});
			} else {
				//Create a new user with the specific data
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					email: req.body.email,
					password: req.body.password
				});
				user
				.save()
				.then( result => {
					console.log(result);
					res.status(201).json({
						message: 'User created'
					});
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({
						error: err
					});
				  });
			}
		}
	})
});

/* Log in */
router.post('/login', (req, res, next) => {
	//Find the email of the user
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		if (user.lenght < 1){
			//If doesn't exists, the authorization fails
			return res.status(404).json({
				message: 'Auth failed'
			});
		}
		//Find the password of the user
		comp = req.body.password === user[0].password;
		//Compare the password typed with the real password
		if(!comp){
			return res.status(404).json({
				message: 'Auth failed'
			});
		} else {
			return res.status(200).json({
				message: 'Auth successful'
			});
		}
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({
			error: err
		});
	});
});

module.exports = router;
