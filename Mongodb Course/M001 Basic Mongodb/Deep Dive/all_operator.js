db.movieDetails.find({genres: {$all: ["Comedy", "Crime", "Drama"]}},
                     {_id: 0, title: 1, genres: 1}).pretty()


db.movieDetails.find({genres: {$all: ["Action", "Comedy"]}}, {_id: 0, title: 1, genres: 1}).pretty() // these two elements must be in genres array.


