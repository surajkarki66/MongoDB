/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Subset Pattern >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Subset Pattern

Modern applications aren't immune from exhausting resources.
MongoDB keeps frequently accessed data, referred to as the working set,
in RAM. When the working set of data and indexes grows beyond the physical RAM allotted,
performance is reduced as disk accesses starts to occur and data rolls out of RAM.

How can we solve this? First, we could add more RAM to the server.
That only scales so much though. We can look at sharding our collection,
but that comes with additional costs and complexities that our application may not be ready for.
Another option is to reduce the size of our working set.
This is where we can leverage the Subset Pattern.

This pattern addresses the issues associated with a working set that exceeds RAM,
resulting in information being removed from memory.
This is frequently caused by large documents which have a lot of data that isn't actually used by the application.
What do I mean by that exactly?

Imagine an e-commerce site that has a list of reviews for a product.
When accessing that product's data it's quite possible that we'd only need the most recent ten or so reviews.
Pulling in the entirety of the product data with all of the reviews could easily cause the working set to expand.

Instead of storing all the reviews with the product,
we can split the collection into two collections.
One collection would have the most frequently used data,
e.g. current reviews and the other collection would have less frequently used data,
e.g. old reviews, product history, etc.
We can duplicate part of a 1-N or N-N relationship that is used by the most used side of the relationship.


In the Product collection, we'll only keep the ten most recent reviews.
This allows the working set to be reduced by only bringing in a portion,
or subset, of the overall data. The additional information, reviews in this example,
are stored in a separate Reviews collection that can be accessed if the user wants to see additional reviews.
When considering where to split your data,
the most used part of the document should go into the "main" collection and the less frequently used data into another.
For our reviews, that split might be the number of reviews visible on the product page.


// Sample Use Case
The Subset Pattern is very useful when we have a large portion of data inside a document that is rarely needed.
Product reviews, article comments,
actors in a movie are all examples of use cases for this pattern.
Whenever the document size is putting pressure on the size of the working set and causing the working set to exceed the computer's RAM capacities,
the Subset Pattern is an option to consider.

// Conclusion
By using smaller documents with more frequently accessed data,
we reduce the overall size of the working set.
This allows for shorter disk access times for the most frequently used information that an application needs.
One tradeoff that we must make when using the Subset Pattern is that we must manage the subset and also if we need to pull in older reviews or all of the information,
it will require additional trips to the database to do so.



// Lab: question
{
  "_id": "<objectId>",
  "item_code": "<string>",
  "name": "<string>",
  "maker_brand": "<string>",
  "price": "<decimal>",
  "description": "<string>",
  "materials": ["<string>"],
  "country": "<string>",
  "image": "<string>",
  "available_sizes": {
    "mens": ["<string>"],
    "womens": ["<string>"]
  },
  "package_weight_kg": "<decimal>",
  "average_rating": "<decimal>",
  "reviews": [
    {
      "author": "<string>",
      "text": "<string>",
      "rating": "<int>"
    }
  ],
  "questions": [
    {
      "author": "<string>",
      "text": "<string>",
      "likes": "<int>"
    }
  ],
  "stock_amount": "<int>",
  "maker_address": {
    "building_number": "<string>",
    "street_name": "<string>",
    "city": "<string>",
    "country": "<string>",
    "postal_code": "<string>"
  },
  "makers": ["<string>"]
}

*/
