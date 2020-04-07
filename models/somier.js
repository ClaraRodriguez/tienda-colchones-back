//Somier Model
const mongoose = require('mongoose');

//Object Somier with Mongoose
const somierSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: String,
	image: String,
	description: String,
	price: Number
});

module.exports = mongoose.model('Somier',somierSchema);