/*
<<<<<<<<<<<<<<<<<<<<<<<<<<< Group Stage >>>>>>>>>>>>>>>>>>>>>>>>>>
$group
-> Groups input documents by the specified _id expression and for each distinct grouping,
 outputs a document. The _id field of each output document contains the unique group by value.
The output documents can also contain computed fields that hold the values of some accumulator expression.
eg
*/
// documents having same field year bundles together to single document.
db.movies.aggregate([
  {
    $group: { _id: "$year" }, // year is expression
  },
]);

// Adding new fields
db.movies.aggregate([
  {
    $group: {
      _id: "$year",
      num_films_in_year: { $sum: 1 }, //accumulator expression (adding new fields) },
    },
  },
  { $sort: { num_films_in_year: -1 } },
]);

db.movies.aggregate([
  {
    $group: {
      _id: {
        numDirectors: {
          $cond: [{ $isArray: "$directors" }, { $size: "$directors" }, 0], // documents with same number of director group together.
        },
      },
      numFilms: { $sum: 1 },
      averageMetacritic: { $avg: "$metacritic" },
    },
  },
  {
    $sort: { "_id.numDirectors": -1 },
  },
]);

// grouping all documents
db.movies.aggregate([
  {
    $group: {
      _id: null,
      count: { $sum: 1 },
    },
  },
]);

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<< Accumulator expression with $project >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
db.icecream_data.aggregate([
  {
    $project: { _id: 0, max_high: { $max: "$trends.avg_high_tmp" } }, // here $max is an accumulator expression
  },
]);

// avg, standard deviation
db.icecream_data.aggregate([
  {
    $project: {
      _id: 0,
      average_cpi: { $avg: "$trends.icecream_cpi" },
      cpi_deviation: { $stdDevPop: "$trends.icecream_cpi" },
    },
  },
]);

// Lab: $group and accumulation
db.movies.aggregate([
  {
    $match: {
      awards: /Won \d{1,2} Oscars?/,
    },
  },
  {
    $group: {
      _id: null, // if _id is null then there will be only one bundle.
      highest_rating: { $max: "$imdb.rating" },
      lowest_rating: { $min: "$imdb.rating" },
      average_rating: { $avg: "$imdb.rating" }, // here max, min, avg are group accumulator
      deviation: { $stdDevSamp: "$imdb.rating" },
    },
  },
]);

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< The $unwind Stage >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$unwind
Deconstructs an array field from the input documents to output a document for each element.
Each output document is the input document with the value of the array field replaced by the element.
*/

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gt: 0 },
      year: { $gte: 2010, $lte: 2015 },
      runtime: { $gte: 90 },
    },
  },
  { $unwind: "$genres" },
  {
    $group: {
      _id: {
        year: "$year",
        genre: "$genres",
      },
      average_rating: { $avg: "$imdb.rating" },
    },
  },
  { $sort: { "_id.year": -1, average_rating: -1 } },
  {
    $group: {
      _id: "$_id.year",
      genre: { $first: "$_id.genre" },
      average_rating: { $first: "$average_rating" },
    },
  },
  { $sort: { _id: -1 } },
]);

// Lab: $unwind
/* Let's use our increasing knowledge of the Aggregation Framework to explore our movies collection in more detail.
We'd like to calculate how many movies every cast member has been in and get an average imdb.rating for each cast member.
*/
db.movies.aggregate([
  {
    $match: {
      cast: { $exists: 1 },
      "imdb.rating": { $exists: 1 },
      languages: { $in: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      num_films: { $sum: 1 },
      average: { $avg: "$imdb.rating" },
    },
  },
  { $sort: { num_films: -1 } },
]);

// Another way
db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  {
    $project: { _id: 0, cast: 1, "imdb.rating": 1 },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numFilms: { $sum: 1 },
      average: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      numFilms: 1,
      average: {
        $divide: [{ $trunc: { $multiply: ["$average", 10] } }, 10],
      },
    },
  },
  {
    $sort: { numFilms: -1 },
  },
  {
    $limit: 1,
  },
]);

/* <<<<<<<<<<<<<<<<<<<<<<<<<<< lookup stage >>>>>>>>>>>>>>>>>>>>>>>>>>
$lookup
-> It lets you combine information from two collections.
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}
 */
db.air_alliances
  .aggregate([
    {
      $lookup: {
        from: "air_airlines",
        localField: "airlines", // the values in localfield and foreign field are matched  on equality.
        foreignField: "name",
        as: "airlines",
      },
    },
  ])
  .pretty();

// Lab
db.air_routes.aggregate([
  {
    $match: {
      airplane: /747|380/,
    },
  },
  {
    $lookup: {
      from: "air_alliances", // foreign collection
      foreignField: "airlines", // it should be single element or array.
      localField: "airline.name",
      as: "alliance",
    },
  },
  {
    $unwind: "$alliance",
  },

  {
    $group: {
      _id: "$alliance.name",
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
]);

/*
 <<<<<<<<<<<<<<<<<<<<<<<<<<< graphLookup stage >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  db.parent_reference.find()
*/
// to show who reports to ceo('Dev')
db.parent_reference.find({ reports_to: 1 });

// alternative to above operation (get full reporting structure )
db.parent_reference.aggregate([
  { $match: { name: "Eliot" } },
  {
    $graphLookup: {
      from: "parent_reference",
      startWith: "$_id",
      connectFromField: "_id",
      connectToField: "reports_to",
      as: "all_reports",
    },
  },
]);

// in future i will use graphLookup
