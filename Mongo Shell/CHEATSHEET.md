# NoSQL
## Definition:
## => It is primarily called as non relational or distributed database.

## => NoSQL databases are document based, key-value pairs, graph database.

## => NoSQL databases are horizontally scalable.

## => MongoDB, Redis, Neo4j, Cassendra etc.

# Commands

## $ show dbs   ( Show databases )
admin   0.000GB
config  0.000GB
local   0.000GB

## $ use database_name  ( Create database ) 
note: To show the created database we have to create atleast one collection(table in sql).

## $ db.createCollection(NameOfCollection)       ( Create a collection )

## $ db   ( To check your current database )

## $ db.dropDatabase()  ( delete your current database )

## $ db.collectionName.drop()   ( delete your collection of name )

## $ show collections  ( show collections of database )

note: document is same as row in database table in SQL.

## $ db.collectionName.insertOne({document})   ( creating collection with one document )
note: document = { name: 'bla', email: 'ba'}

## $ db.collectionName.insertMany([{document1}, {document2}])   ( creating collection with multiple document )

## $ db.collectionName.find(query, projection)     ( Show all documents of collection ) ( query and projection are optional parameters)

## eg: $ db.blog.find({likes: {$eq: 200}})

note: operators:
    1) $eq (equal to)
    2) $gt (greater than)
    3) $lt (less than)
    4) $gte (grater than and equal to)
    5) $lte
    6) $in
    7) $ne (not equal)
    8) $nin

eg: db.blog.find({$and: [{title: "World"}, {likes: 100}]})

note: projection => getting only specified fields of document. 1->true, 0->false
eg: db.blog.find({title: "World"}, {author: 1}) (only getting author of the document where title is World)

## $ db.collectionName.find().count()  ( count the no of documents of given collectionName )
eg: db.blog.find({$and: [{title: "World"}, {likes: 100}]}).count()

## $ db.collectionName.find().sort({field: boolean})
eg: db.blog.find().sort({title: 1})  1 -> ascending, -1 -> descending

## $ db.collectionName.find().limit(2)  ( show only two documents )

## $ db.collectionName.updateOne({_id: value}, {$set: { field: value }})  ( update field if exist otherwise create the field in the document )

## db.collectionName.deleteOne({_id: value})  ( Deleting the document of specified id )


# Relation in mongoDB

# 1) one to many:
eg: db.ytVideo.insert({
            "name" : "python",
            "comments" : [
                {
                    "username" : "suraj",
                    "comment" : "Nice"
                },
                {
                    "username" : "binod",
                    "comment" : "good"
                }
            ]
     }
)









