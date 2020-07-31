// MongoDb shell is designed to support javascript. So to run js file in MongoDb shell

// CMD: load("nameofjsfile")

// To connect mongodb shell with mongodb cluster:

// CMD: mongo "mongodb+srv://cluster0.ee1zn.mongodb.net/<dbname>" --username <username> --password <password>"

// Query matching the value inside the subdocument:
// db.collection_name.find({"object.properyOfObject": value})
db.movieDetails.find({"imdb.rating": 8})

// Query matching the elements inside an array:
db.movieDetails.find({genres:["Action"]}).pretty() // exact match only show movie having genres only action in the array

// Query matching the one element inside an array:

db.movieDetails.find({actors: "Tom Hanks"}).pretty() // here Tom Hanks is the element inside an array.

// Query matching the first element inside an array.

db.movieDetails.find({"actors.0": "Tom Hanks"}).pretty()

// Projection

// It reduces network overhead and proccessing requirements by limiting the fields that are returned in results documents. By default mongo db returns all fields in all matching documents for queries.

db.movieDetails.find({genres: "Action"}, {title: 1}).pretty() // returning only title

//Note: including field using 1 and excluding field using 0

// Updating operation

db.movieDetails.updateOne({
    title: "The Martian",
    },
    {
    $set: {
    	poster: "https://www.imdb.com/title/tt3659388/mediaviewer/rm1391324160"
    	}
    }
)

db.movieDetails.updateOne({
    title: "The Martian"
    },
    { $set: {
    		"awards": {"wins": 8, "nominations": 14, "text": "Nominated for 3 Golden Globes."}
    		}
    }
)

// Other update operators

// $inc (increment)

db.movieDetails.updateOne({
    title: "The Martian"
    },
    {
    	$inc: {
    	"tomato.reviews": 3,
    	"tomato.userReviews": 25
    	}
    }
)

// $currentDate

db.movieDetails.updateOne({
    title: "The Martian"
    },
    { $currentDate: {
    				"tomato.date": { $type: "timestamp" }
    		}
    }
)

// Updating array operator

// $push creates an array if already not exist

// added single element in an array.

db.movieDetails.updateOne({
    title: "The Martian"
    },
    {
    	$push: {
    		reviews: {
    			rating: 4.5,
    			date: ISODate("2016-01-12T09:00:00Z"),
    			reviewer: "Spencer H.",
    			text: "This is good movie."
    		},
    		comment: "Nice"
    		}
    })

// $each

{ _id: 2, item: "cable", tags: [ "electronics", "supplies" ] } # inventory

db.inventory.update(
{ _id: 2 },
{ $addToSet: { tags: { $each: [ "camera", "electronics", "accessories" ] } } }
)

// Updating Many

db.movieDetails.updateMany({
    rated: null
    },
    {
    	$set: {
    		rated: ""
    		}
})

// Upserts:

Update if document exist or create document if document is not matched.
db.movieDetails.updateOne({ title: "Suraj"}, { $set: { title: "Suraj", imdb: "tt4423"}}, {upsert: true})

// Replace One:

With replaceOne() you can only replace the entire document, while updateOne() allows for updating fields.

// Delete
// DeleteOne
db.reviews.deleteOne({_id: ObjectId("5f23b0a7f2e387a6024c8dac")})

// DeleteMany
db.reviews.deleteMany({reviewer_id: 759723314})
