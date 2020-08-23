/*
<<<<<<<<<<<<<<<<<<<<<<<<< Schema Versioning Pattern >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Schema Versioning Pattern

It has been said that the only thing constant in life is change.
This holds true to database schemas as well. Information we once thought wouldn’t be needed, 
we now want to capture. Or new services become available and need to be included in a database record.
Regardless of the reason behind the change, after a while, we inevitably need to make changes to the 
underlying schema design in our application. While this often poses challenges, and perhaps at least
a few headaches in a legacy tabular database system, in MongoDB we can use the Schema Versioning 
pattern to make the changes easier.

Updating a database schema in a tabular database can as mentioned,
be challenging. Typically the application needs to be stopped, the database migrated
to support the new schema and then restarted. This downtime can lead to poor customer experience.
Additionally, what happens if the migration wasn’t a complete success? Reverting back to the prior 
state is often an even larger challenge.

The Schema Versioning pattern takes advantage of MongoDB’s support for differently 
shaped documents to exist in the same database collection. This polymorphic aspect of 
MongoDB is very powerful. It allows documents that have different fields or even different 
field types for the same field, to peaceful exist side by side.


The implementation of this pattern is relatively easy.
Our applications start with an original schema which eventually needs to be altered.
When that occurs we can create and save the new schema to the database with a schema_version field.
This field will allow our application to know how to handle this particular document. Alternatively, 
we can have our application deduce the version based on the presence or absence of some given fields,
but the former method is preferred. We can assume that documents that don’t have this field, 
are version 1. Each new schema version would then increment the schema_version field value and 
could be handled accordingly in the application.

As new information is saved, we use the most current schema version.
We could make a determination, depending on the application and use case,
as to the need of updating all documents to the new design, updating when a 
record is accessed, or not at all. Inside the application, we would create handling 
functions for each schema version.

// Sample Use Case

As stated, just about every database needs to be changed at some point during its lifecycle,
so this pattern is useful in many situations. Let’s take a look at a customer profile use case.
We start keeping customer information before there is a wide range of contact methods.
They can only be reached at home or at work:

{
    "_id": "<ObjectId>",
    "name": "Anakin Skywalker",
    "home": "503-555-0000",
    "work": "503-555-0010"
}

As the years go by and more and more customer records are being saved,
we notice that mobile numbers are needing to be saved as well.
Adding that field in is straight forward.

{
    "_id": "<ObjectId>",
    "name": "Darth Vader",
    "home": "503-555-0100",
    "work": "503-555-0110",
    "mobile": "503-555-0120"
}
More time goes by and now we’re discovering that fewer and fewer people have a home phone,
and other contact methods are becoming more important to record. Items like Twitter, Skype,
and Google Hangouts are becoming more popular and maybe weren’t even available when we first
started keeping contact information. We also want to attempt to future proof our application 
as much as possible and after reading the Building with Patterns series we know about the 
Attribute Pattern and implement that into a contact_method array of values. In doing so, 
we create a new schema version.

{
    "_id": "<ObjectId>",
    "schema_version": "2",
    "name": "Anakin Skywalker (Retired)",
    "contact_method": [
        { "work": "503-555-0210" },
        { "mobile": "503-555-0220" },
        { "twitter": "@anakinskywalker" },
        { "skype": "AlwaysWithYou" }
    ]
}

The flexibility of the MongoDB document model allows for all of this to occur 
without downtime of the database. From an application standpoint, 
it can be designed to read both versions of the schema. This application 
change in how to handle the schema difference shouldn’t require downtime either,
assuming there is more than a single app server involved.
*/
