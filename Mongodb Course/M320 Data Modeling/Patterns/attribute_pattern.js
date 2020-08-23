/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Attribute Pattern >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
1) Attribute Pattern

-> It is one of the most frequent schema design patterns used in MongoDB.
->  Lets take an example of products like coke, battery, mobile.
-> It address the problem of having lots of similar fields in documents.
-> If you need to create a same index of many fields.
-> Fields that share common characteristics.

Attribute Lab:
{
  "_id": ObjectId("5c5348f5be09bedd4f196f18"),
  "title": "Cookies in the sky",
  "artist": "Michelle Vinci",
  "date_acquisition": ISODate("2017-12-25T00:00:00.000Z"),
  "location": "Blue Room, 20A",
  "on_display": false,
  "in_house": false,
  "events": [{
    "moma": ISODate("2019-01-31T00:00:00.000Z"),
    "louvres": ISODate("2020-01-01T00:00:00.000Z")
  }]
}
ans: pattern_attribute.json

// Use Cases:

The Attribute Pattern is well suited for schemas that have sets of fields that have the same value type, such as lists of dates.
It also works well when working with the characteristics of products.
Some products, such as clothing, may have sizes that are expressed in small, medium, or large.
Other products in the same collection may be expressed in volume. Yet others may be expressed in physical dimensions or weight.

A customer in the domain of asset management recently deployed their solution using the Attribute Pattern.
The customer uses the pattern to store all characteristics of a given asset.
These characteristics are seldom common across the assets or are simply difficult to predict at design time.
Relational models typically use a complicated design process to express the same idea in the form of user-defined fields.

While many of the fields in the product catalog are similar,
such as name, vendor, manufacturer, country of origin, etc.,
the specifications, or attributes, of the item may differ.
If your application and data access patterns rely on searching through many of these different fields at once,
the Attribute Pattern provides a good structure for the data.


// Conclusion:
The Attribute Pattern provides for easier indexing the documents, targeting many similar fields per document.
By moving this subset of data into a key-value sub-document, we can use non-deterministic field names,
add additional qualifiers to the information, and more clearly state the relationship of the original field and value.
When we use the Attribute Pattern,
we need fewer indexes, our queries become simpler to write, and our queries become faster.
*/
