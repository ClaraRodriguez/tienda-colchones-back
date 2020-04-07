const { MongoClient } = require("mongodb");
 
// Connect with MongoDB                                                                                                                                    
const url = "mongodb+srv://dbUser:dbUserPassword@mycluster-rvwj9.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "tienda-colchones";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "colchones"
         const col = db.collection("colchones");
		 // Use the collection "somieres"
         const col2 = db.collection("somieres");

         // Construct a list of "colchones"                                                                                                                                         
		 let colchones = [
			{
				"image": "https://i.imgur.com/cplzaxc.jpg",
				"title": "Colchón A" ,                                                                                                                             
				"description": "Es un colchón de clase A." ,                                                                                                                             
				"price": 12
			},
			{
				"image": "https://i.imgur.com/o6tdldq.jpg",
				"title": "Colchón B" ,                                                                                                                             
				"description": "Es un colchón de clase B." ,                                                                                                                             
				"price": 24
			},
			{
				"image": "https://i.imgur.com/BHNYOWa.jpg",
				"title": "Colchón C" ,                                                                                                                             
				"description": "Es un colchón de clase C." ,                                                                                                                             
				"price": 36
			}
			]
			// Construct a list of "somieres"    
			let somieres = [
			  {
				"image": "https://i.imgur.com/fENAU3V.jpg",
				"title": "Somier A" ,                                                                                                                             
				"description": "Es un somier de clase A." ,                                                                                                                             
				"price": 21,
			  },
			  {
				"image": "https://i.imgur.com/eJZFhh6.jpg",
				"title": "Somier B" ,                                                                                                                             
				"description": "Es un somier de clase B." ,                                                                                                                             
				"price": 42,
			  },
			  {
				"image": "https://i.imgur.com/bFkY4t8.jpg",
				"title": "Somier C" ,                                                                                                                             
				"description": "Es un somier de clase C." ,                                                                                                                             
				"price": 63,
			  }
			]
		 

		 // Insert some "colchones", wait for promise so we can read it back
         const p = await col.insertMany(colchones);
		// Insert some "somieres", wait for promise so we can read it back
         const p2 = await col2.insertMany(somieres);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);