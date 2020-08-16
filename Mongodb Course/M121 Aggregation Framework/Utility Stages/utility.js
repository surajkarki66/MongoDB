/*
<<<<<<<<<<<<<<<<<<<<<<<<< $addFields >>>>>>>>>>>>>>>>>>>>>>>>>
-> It is extremely similar to $project.
-> But the main difference is $addFields add fields to a documents.
-> While with $project , we can selectively remove and retain fields.
-> $addFields only allows  you to modify the incomming  pipeline documents with new computed
fields or  modify existing fields.
*/

eg: db.solarSystem.aggregate([
  {
    $addFields: {
      gravity: "$gravity.value",
      mass: "$mass.value",
      radius: "$radius.value",
      sma: "$sma.value",
    },
  },
]);

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<< Geo Near Stage >>>>>>>>>>>>>>>>>>>>>>>
$geoNear

-> Outputs documents in order of nearest to farthest from a specified point.

eg:
*/

db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [-73.98, 40.75], // here this coordinates is the specified point.
      },
      distanceField: "distanceFromMongoDB",
      spherical: true,
    },
  },
]);

// finding five nearest hospitals from MongoDB headquater.
db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [-73.98, 40.75], // here this coordinates is the specified point.
      },
      distanceField: "distanceFromMongoDB",
      query: { type: "Hospital" }, // filtering the incomming documents.
      spherical: true,
    },
  },
  { $limit: 5 },
]);

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<< Cursor-like stages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
There is file which contains all related to cursor-like stages

*/

/*
<<<<<<<<<<<<<<<<<<<<<<<<<< Sample Stage >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$sample
->  It is also a utility stage.
-> It will select set of random documents from a collection from 2 methods
*/

db.nycFacilities.aggregate([{ $sample: { size: 200 } }]); // sample size is greater than 5% of total documents. then sample is first stage in this pipeline
// LAB Using Cursor stages
favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $addFields: {
      rating: "$tomatoes.viewer.rating",
      num_favs: { $setIntersection: ["$cast", favorites] },
    },
  },
  {
    $match: {
      rating: { $gte: 3 },
      countries: "USA",
      num_favs: { $ne: [], $ne: null },
    },
  },
  {
    $project: {
      title: 1,
      rating: 1,
      countries: 1,
      num_favs: { $size: "$num_favs" },
    },
  },
  {
    $sort: {
      num_favs: -1,
      rating: -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  { $limit: 1 },
]);

// Another
var favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      "tomatoes.viewer.rating": { $gte: 3 },
      countries: "USA",
      cast: {
        $in: favorites, //intersection
      },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      "tomatoes.viewer.rating": 1,
      num_favs: {
        $size: {
          $setIntersection: ["$cast", favorites],
        },
      },
    },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);

// LAB: Bringing it all together
db.movies.aggregate([
  {
    $match: {
      year: { $gte: 1990 },
      languages: { $in: ["English"] },
      "imdb.votes": { $gte: 1 },
      "imdb.rating": { $gte: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      "imdb.rating": 1,
      "imdb.votes": 1,
      normalized_rating: {
        $avg: [
          "$imdb.rating",
          {
            $add: [
              1,
              {
                $multiply: [
                  9,
                  {
                    $divide: [
                      { $subtract: ["$imdb.votes", 5] },
                      { $subtract: [1521105, 5] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
  { $sort: { normalized_rating: 1 } },
  { $limit: 1 },
]);
