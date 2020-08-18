// Query Operators

//  Comparision Operator:
db.movieDetails.find({runtime: {$gt: 90}}) // Greater than
db.movieDetails.find({runtime: {$gt: 90}}, {_id: 0, title: 1, runtime: 1})
db.movieDetails.find({runtime: {$gt: 90, $lt: 120}}, {_id: 0, title: 1, runtime: 1}) // Greater than and Lesser than

//Using multiple filters
db.movieDetails.find({runtime: {$gte: 180}, "tomato.meter": {$gte: 95}}, {_id: 0, title: 1, runtime: 1}) // Greater than or Equal to

db.movieDetails.find({rated: {$ne: "UNRATED"}}, {_id: 0, title: 1, rated: 1}) // Not equal
db.movieDetails.find({rated: {$in: ["G", "PG"]}}, {_id: 0, title:1, rated: 1}) // in
