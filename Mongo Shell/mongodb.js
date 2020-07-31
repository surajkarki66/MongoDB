// BSON Datatypes
{
	string: "String of text",
	int: 405,
	double: 3.545,
	boolean: true,
	array: [1, 2, 3],
	object: { attr1: "attr1", attr2: "attr2"},
	date: new Date(),
	object_id: <ObjectId>,
	no_value: null

}

// Additional Datatypes
/*
	Timestamp
	Binary data
	regular expression
	Js code
*/

// Inserting
db.actors.insertOne({
	"full_name": "Tom Cruise",
	"age": 55,
	"net_worth": 100000000,
	"movies": ["Top Gun", "Rain Man"]
})
db.actors.insertOne({
	"full_name": "Rober Downey Jr",
	"age": 53,
	"net_worth": 100000044,
	"movies": ["Sherlock Holmes", "Iron Man"]
})
db.actors.insertOne({
	"full_name": "Leonardo DeCaprio",
	"age": 53,
	"net_worth": 100000044,
	"movies": ["Sherlock Holmes", "Iron Man"],
	"language": "English"
})
db.actors.insertOne({
	"full_name": "Brad Pit",
	"age": 53,
	"net_worth": 100000044,
	"movies": ["Fight Club", "Ad Astra"],
	"language": "English",
	"contact": { "phone": 989934893859, "email": "pt@test.com" }

})

// Finding
db.actors.find({})
db.actors.find({}).pretty()
db.actors.find({}, {_id: 0}) // not include _id
db.actors.find({}, {net_worth: 0}).limit(2) // only show 2 documents without the field net_worth
db.actors.find({}).sort({full_name: 1})  // show the sorted by name documents
db.actors.find({full_name: "Leonardo DeCaprio"}) // filtering by full_name
db.actors.find({full_name: "Robert Downey Jr", age: 53}) // filtering by multiple fields by full_name and age.
db.actors.find({$or: [{language: "English"}, {age: 53}]}) // filtering by condition language english or age 53.
db.actors.find({ age: {$gt: 53}}) // filtering by condition where age is greater than 53

// Comparision operator
// $eq, $ne, $lt, $gt, $lte, $gte

db.actors.find({ age: {$in: [53, 54]}})

db.actors.find({language: {$exists: true}}) // Any records in the collection who have the language field

db.actors.find({ full_name: {$type: 2}}) // Returns documents that have name as a string field.

db.actors.find({"movies.0": "Fight Club"}) // returns document that have movies array of first element as Fight Club


// Updating and Deleting
db.actors.updateOne(  // update one document where age is 53 to 55
	{age: 53},  // filtering
	{
		$set:
			{age: 55}   // updating
	}
)
db.actors.updateMany(
	{age: 53},
	{
		$set:
			{age: 55}
	}
)

// Replacing
db.actors.replaceOne(
	{age: 55},
	{full_name: "T. Cruise", age: 55, net_worth, movies: ["Edge of Tommorrow"]}
)

// Deleting
db.actors.deleteMany({}) // delete all documents of actors collection

db.actors.deleteOne({age: 55})

// Bulk write
// Special function of mongo db. Able to combine different database request into the one request
// It is done on one single collection.
db.actors.bulkWrite(
	[
		{
			insertOne:
			{
				"document": {
					full_name: "James Corden",
					age: 50,
					net_worth: 6000,
					shows: ["Late late show"],
					language: "British English"

				}
			}
		},
		{
			insertOne:
			{
				"document": {
					ful_name: "Chris Evan",
					age: 45,
					net_worth: 50000,
					movies: ["Captain America", "Fantastic Four" ],
					language: "American English"
				}
			}
		},
		{
			updateOne:
			{
				filter: { full_name: "Leonardo DeCaprio" },
				update: {$set: { movies: ["Inception", "Titanic", "Catch me if you can"]}}
			}
		},
		{
			deleteOne:
			{
				 filter: { full_name: "Brad Pit"}
			}
		}
	]
)

// Text Indexing
// Special things that we put on the collection. Do text searching for that collection.
db.movies.insertMany(
	[
		{ name: "Trolls", genre:"Animation", imdb_rating: 6, direcctor: "David Boom"},
		{ name: "Intersteller", genre: "Sci-Fi", imdb_rating: 8, direcctor: "Christopher Nolan"},
		{ name: "Iron Man", genre: "Action", imdb_rating: 7.9, direcctor: "John Fabreu"},
		{ name: "The dark knight", genre: "Thriller", imdb_rating: 9, direcctor: "Christopher Nolan"}
	]
)

db.movies.createIndex( {name: "text", director: "text"} )

db.movies.find({ $text: { $search: "Iron"} })
db.movies.find({ $text: { $search: "Iron"} },
			   { score: { $meta: "textScore"}}
               )
db.movies.find({ $text: { $search: "Iron"} },
			   { score: { $meta: "textScore"}}
               ).sort({ score: {$meta: "textScore"}})
// Aggregation
// It allows us to process data records
