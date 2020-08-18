/*
<<<<<<<<<<<<<<<<<<<<<<<<< Aggregation Peformance >>>>>>>>>>>>>>>>>>>>>>>>>>>
1) "realtime" proccessing:
-> Provide data for application.(software and website)
-> Query peformance is more important.

2) batch processing:
-> Provide data for data analytics.
-> Query peformance is less important.

a) Index usage for aggregation queries:
always put the stage last in the aggregation pipeline which is not support indexing.

db.orders.createIndex({ cust_id: 1 });

db.orders.aggregate([
  { $match: { cust_id: { $lte: 50 } } },
  { $limit: 10 }, // limit and sort always should close to the each other. here first only memory is allocated for 10 documents
  { $sort: { cust_id: 1 } },
]);

b) Memory Constraints:
-> results are subject to 16mb document limit. Aggregation framework always return a single document.(16mb) 
Solution-> use $limit and $project to reduce your document size.


-> 100mb of RAM per stage
Solution-> use indexes
Solution2 -> db.orders.aggregate([], {allowDiskUse: true})

<<<<<<<<<<<<<<<<<<<<<<<<< aggregation pipeline in a sharded cluster >>>>>>>>>>>>>>>>>>>>>>>>>>>

<<<<<<<<<<<<<<<<<<<<<<<<<< Pipeline Optimization >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
The info is in .js file.
*/
db.coll.aggregate([
  {
    $facet: {
      averageCount: [
        { $unwind: "$array_field" },
        { $group: { _id: "$array_field", count: { $sum: 1 } } },
      ],
      categorized: [{ $sortByCount: "$arrayField" }],
    },
  },
  {
    $facet: {
      new_shape: [{ $project: { range: "$categorized._id" } }],
      stats: [{ $match: { range: 1 } }, { $indexStats: {} }],
    },
  },
]);
