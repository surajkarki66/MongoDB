db.movieDetails.find({countries: {$size: 1}}).pretty() // according to length of an array.
