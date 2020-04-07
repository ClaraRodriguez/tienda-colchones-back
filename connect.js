const { MongoClient } = require("mongodb");
var express = require("express");
var app = express();
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://dbUser:dbUserPassword@mycluster-rvwj9.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
		
		// Create user
		 /*db.createUser(
						  {
							user: "dbUser",
							pwd: "dbUserPassword",
							roles: [
							   { role: "readWrite", db: "colchones" },
							   { role: "readWrite", db: "somieres" }
							]
						  }
						)	*/
		/*app.get('/', (req, res) => res.send('HEY'));
		app.listen(4200, () => console.log('Done'));*/

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);