db.movieDetails.find({rated: {$exists: true}})

db.movieDetails.find({rated: {$exists: false}})

db.movieDetails.find({rated: null})

db.movieDetails.find({})

db.movies.find({viewerRating: {$type: "int"}}).pretty()

db.movies.find({viewerRating: {$type: "double"}}).pretty()

