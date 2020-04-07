//Colchon Model
const mongoose = require('mongoose');

//Object Colchon with Mongoose
const colchonSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: String,
	image: String,
	description: String,
	price: Number
});

module.exports = mongoose.model('Colchon',colchonSchema);