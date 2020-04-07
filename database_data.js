var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dbUser:dbUserPassword@mycluster-rvwj9.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //Connect to the database
  var dbo = db.db("tienda-colchones");
  //Find all the elements "colchones"
  dbo.collection("colchones").find({}).toArray(function(err, result) {
    if (err) throw err;
	
	//...
	
    console.log(result);
    db.close();
  });
});