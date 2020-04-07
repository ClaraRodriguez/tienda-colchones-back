var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Colchon = require('../models/colchon');
/* GET colchones listing. */
router.get('/', (req, res, next) => {
  //Find the specific data of all the "colchones"
  Colchon.find()
  .select('title image description price _id')
  .exec()
  .then(docs => {
	  const response = {
		// Count the number of objects
		count: docs.length,
		// Return all the data of all the objects
		colchones: docs.map(doc => {
			return {
				title: doc.title,
				image: doc.imag,
				description: doc.description,
				price: doc.price,
				_id: doc_id,
				request: {
					type: 'GET',
					url: 'http://localhost:4200/colchones' + doc._id
				}
			};
		})
	  };
	 console.log(docs); 
	 if(docs.length >= 0) {
		res.status(200).json(response);
	 } else {
		res.status(404).json({
		  message: 'No entries found'
	  });
	 }
  })
  .catch(err => {
	  console.log(err);
	  res.status(500).json({
		  error: err
	  });
  });
});
/* Create colchon. */
router.post('/', (req, res, next) => {
  //Create a new "colchon" with the requested data
  const colchon = new Colchon({
	  _id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		image: req.body.imag,
		description: req.body.description,
		price: req.body.price
  });
  //Save the "colchon" and return the data
  colchon
  .save()
  .then(result => {
	  console.log(result);
	  res.status(201).json({
	  message: 'Create colchon successfully',
	  createdColchon: {
		title: result.title,
		image: result.imag,
		description: result.description,
		price: result.price,
		_id: result.id,
		request: {
					type: 'GET',
					url: 'http://localhost:4200/colchones/' + result._id
				}
	  }
	});
  })
  .catch (err => {
	console.log(err)
	res.status(500).json({
		error: err
	});
  });
  
});
/* GET a specific colchon. */
router.get('/:colchonId', (req, res, next) => {
	//Obtain the id of the object
	const id = req.params.id;
	//Find the element in the db
	Colchon.findById(id)
	.select('title image description price _id')
	.exec()
	.then(doc => {
		console.log(doc);
		if (doc) {
			res.status(200).json({
				//Return the specific object if exists
				colchon: doc,
					request: {
					type: 'GET',
					url: 'http://localhost:4200/colchones'
				}
			});
		} else {
			res.status(404).json({message: 'No valid entry found for provided ID'});
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
	res.status(200).json({
		message: 'You passed an ID of colchón'
	});
});
/* Update a specific colchon. */
router.patch('/:colchonId', (req, res, next) => {
	//Obtain the id of the object
	const id = req.params.id;
	const update0ps = {};
	//Update the value of all the data of the object
	for (const ops of req.body){
		update0ps[ops.propName] = ops.value;
	}
	Colchon.update({_id: id},{ $set: update0ps})
	.exec()
	.then(result =>{
		//Return the object updated
		res.status(200).json({
			message: 'Colchon updated',
			request: {
					type: 'GET',
					url: 'http://localhost:4200/colchones/' + id
				}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
		error: err
	  });
	});
});
/* DELETE a specific colchon. */
router.delete('/:colchonId', (req, res, next) => {
	//Obtain the id of the object
	const id = req.params.id;
	//Remove the element obtained
	Colchon.remove()
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Colchon deleted',
			request: {
					type: 'POST',
					url: 'http://localhost:4200/colchones',
					body: {title: 'String', image: 'String', description: 'String' ,price: 'Number'}
				}
		});
	})
	.catch(err => {
	  console.log(err);
	  res.status(500).json({
	  error: err
	  });
	});
});



module.exports = router;
