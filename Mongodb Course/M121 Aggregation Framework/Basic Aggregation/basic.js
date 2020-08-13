/* 
<<<<<<<<<<<<<<<<<<<<<<<<<< Filtering documents with $match >>>>>>>>>>>>>>>>>>>>>>>>>>
-> It may be use multiple time in aggregation pipeline.
-> It is a filter.(filtering of documents according to predicate)
-> $match uses standard mongodb query operators.
eg:  db.solarSystem.aggregate([{$match:{ type: {$ne: "Star"}}}])
eg: db.solarSystem.aggregate([{$match:{ type: {$ne: "Star"}}}, {$count: "planets"}]) here count is utility stage

-> $match doesnot allow for projection.


LAB 1:
Lab - $match
Problem:

Help MongoDB pick a movie our next movie night! Based on employee polling, we've decided that potential movies must meet the following criteria.

imdb.rating is at least 7
genres does not contain "Crime" or "Horror"
rated is either "PG" or "G"
languages contains "English" and "Japanese"

solution: 

var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      "genres": { $nin: ["Crime", "Horror"] },
      "rated": { $in: ["PG", "G"] },
      "languages": { $all: ["English", "Japanese"] },
    },
  }
];


<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Shaping Documents with $project >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-> $project is not just like projection in find method, it is more than  that.
-> in $project we can also assign a value to a field.

eg: db.movies.aggregate([{$project: {_id: 0, title: 1}}])

eg: db.solarSystem.aggregate([{$project: {_id: 0, name: 1, gravity: "$gravity.value"}}]) here gravity is new field

eg: db.solarSystem.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      myWeight: { $multiply: [{ $divide: ["$gravity.value", 9.8] }, 86] },
    },
  },
];
)    

LAB:2 

var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      "genres": { $nin: ["Crime", "Horror"] },
      "rated": { $in: ["PG", "G"] },
      "languages": { $all: ["English", "Japanese"] },
    },
  },
  {
    $project: { _id: 0, title: 1, rated: 1 },
  },
];

LAB: 3
Show documents that have title of only a single words
db.movies.aggregate([
  {
    $project: {
      newTitle: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      newTitle: { $size: 1 },
    },
  },
]);


Optional LAB:
$map

db.movies.aggregate([
  {
    $project: {
      writers: {
        $map: {
          input: "$writers",
          as: "writer",
          in: {
            $arrayElemAt: [
              {
                $split: ["$$writer", " ("],
              },
              0,
            ],
          },
        },
      },
    },
  },
]);

in is where the work is performed. Here, we use the $arrayElemAt expression, which takes two arguments,
the array and the index of the element we want. We use the $split expression,
splitting the values on " (".

If the string did not contain the pattern specified,
the only modification is it is wrapped in an array, so $arrayElemAt will always work


db.movies.aggregate([
  {
    $match: {
      cast: { $elemMatch: { $exists: true } },
      directors: { $elemMatch: { $exists: true } },
      writers: { $elemMatch: { $exists: true } }
    }
  },
  {
    $project: {
      _id: 0,
      cast: 1,
      directors: 1,
      writers: {
        $map: {
          input: "$writers",
          as: "writer",
          in: {
            $arrayElemAt: [
              {
                $split: ["$$writer", " ("]
              },
              0
            ]
          }
        }
      }
    }
  },
  {
    $project: {
      labor_of_love: {
        $gt: [
          { $size: { $setIntersection: ["$cast", "$directors", "$writers"] } },
          0
        ]
      }
    }
  },
  {
    $match: { labor_of_love: true }
  },
  {
    $count: "labors of love"
  }
])

*/
