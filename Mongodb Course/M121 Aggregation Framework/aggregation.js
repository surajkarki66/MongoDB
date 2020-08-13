/*
    <<<<<<<<<<<<<<<<<<<<<<<< Aggregation Framework >>>>>>>>>>>>>>>>>>>>>>>>

    Aggregation operations process data records and return computed results.
    Aggregation operations group values from multiple documents together, 
    and can perform a variety of operations on the grouped data to return a single result. 
    MongoDB provides three ways to perform aggregation: the aggregation pipeline, 
    the map-reduce function, and single purpose aggregation methods.

    The Aggregation framework is just a way to query documents in a collection in MongoDB.
    This framework exists because when you start working with and manipulating data,
    you often need to crunch collections together, modify them, pluck out fields,
    rename fields, concat them together, group documents by field, 
    explode array of fields in different documents and so on.

    This cannot be done by the traditional querying system which MongoDB comes with 
    (that is, the find query or update query, or any other query you might have used).

    The simple query set in MongoDB only allows you to retrieve full or parts of individual documents.
    They don't really allow you to manipulate the documents on the server and then return them to your application.

    The Aggregation framework relies on the pipeline concept. Here a pipeline contains many stages.

    In MongoDB, the pipeline is an array consisting of various operators,
    which take in a bunch of documents and spit out modified documents according to the rules specified by the programmer.
    The next operator takes in the documents spat out by the previous operator, hence,
    
    it's called a pipeline.
    Mainly: pipeline
    stage1 -> $match ( filtering the document with predicate)
    stage2 -> $project (getting only required fields)
    stage3 -> $group (performing operation in document and group them together in single)
*/
