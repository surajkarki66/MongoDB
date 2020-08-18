/*
<<<<<<<<<<<<<<<<<<<<<<<<<< Facets >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-> create an interface that characterizes query results across multiple dimensions of facets.
faceting is a popular analytics capability that allows user to explore data by applying multiple filters
and characterizations.

-> narrow down the documents using as much as filters possible.
*/

/*
<<<<<<<<<<<<<<<<<<<<<<<<<< Single Facet Query >>>>>>>>>>>>>>>>>>>>>>>>>
*/
// Create index
db.companies.createIndex({ description: "text", overview: "text" }); // here text is index for both desc and overview.
//
db.companies.aggregate([{ $match: { $text: { $search: "network" } } }]); // we able to create same index for multiple field in the document.

//$sortByCount stage
/*
Groups incoming documents based on the value of a specified expression,
then computes the count of documents in each distinct group.
*/

db.companies.aggregate([
  { $match: { $text: { $search: "network" } } },
  { $sortByCount: "$category_code" },
  { $project: { title: 1, _id: 0 } },
]);

db.companies.aggregate([
  { $match: { $text: { $search: "network" } } },
  { $unwind: "$offices" },
  { $match: { "offices.city": { $ne: "" } } },
  { $sortByCount: "$offices.city" },
]);

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<< Facets manual bucket >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
bucket
-> group data by range value  as opposed for individual values
*/

db.companies
  .find({}, { number_of_employees: 1 })
  .sort({ number_of_employees: -1 });

db.companies
  .aggregate([
    {
      $match: {
        founded_year: { $gte: 1980 },
        number_of_employees: { $ne: null },
      },
    },
    {
      $bucket: {
        groupBy: "$number_of_employees",
        boundaries: [0, 20, 50, 100, 500, 1000, Infinity], // in first document 0<value<=19, then 20 < value <= 49 so one. all elements of boundaries array must be same datatype
        default: "Other", // default is  the name of bucket which doesnt fit in the described boundaries
        output: {
          total: { $sum: 1 },
          average: { $avg: "$number_of_employees" },
          categories: { $addToSet: "$category_code" },
        },
      },
    },
  ])
  .pretty();

/* 
<<<<<<<<<<<<<<<<<<<<<<<< Auto Buckets >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$bucketAuto
*/

db.companies.aggregate([
  { $match: { "offices.city": "New York" } },
  {
    $bucketAuto: {
      groupBy: "$founded_year",
      buckets: 5, // making 5 different ranges
      output: {
        total: { $sum: 1 },
        average: { $avg: "$number_of_employees" },
      },
    },
  },
]);

/* 
<<<<<<<<<<<<<<<<<<<<<<<< Multiple Facets >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$facet
->The $facet stage allows you to create multi-faceted aggregations which characterize data across multiple dimensions,
 or facets, within a single aggregation stage.
*/

db.companies
  .aggregate([
    { $match: { $text: { $search: "Databases" } } },
    {
      $facet: {
        Categories: [{ $sortByCount: "$category_code" }],
        Employees: [
          // here categories, employees, founded are different facets
          { $match: { founded_year: { $gt: 1980 } } },
          {
            $bucket: {
              groupBy: "$number_of_employees",
              boundaries: [0, 20, 50, 100, 500, 1000, Infinity],
              default: "Other",
            },
          },
        ],
        Founded: [
          { $match: { "offices.city": "New York" } },
          {
            $bucketAuto: {
              groupBy: "$founded_year",
              buckets: 5,
            },
          },
        ],
      },
    },
  ])
  .pretty();

// Lab: Facets
db.movies.aggregate([
  {
    $match: {
      metacritic: { $gte: 0 },
      "imdb.rating": { $gte: 0 },
    },
  },
  {
    $project: {
      _id: 0,
      metacritic: 1,
      imdb: 1,
      title: 1,
    },
  },
  {
    $facet: {
      top_metacritic: [
        {
          $sort: {
            metacritic: -1,
            title: 1,
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            title: 1,
          },
        },
      ],
      top_imdb: [
        {
          $sort: {
            "imdb.rating": -1,
            title: 1,
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            title: 1,
          },
        },
      ],
    },
  },
  {
    $project: {
      movies_in_both: {
        $setIntersection: ["$top_metacritic", "$top_imdb"],
      },
    },
  },
]);
