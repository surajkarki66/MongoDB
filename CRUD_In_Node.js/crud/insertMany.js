export default async function insertManyListing(client, newListings) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingAndReviews")
    .insertMany(newListings);
  console.log(
    `${result.insertedCount} new listing(s) created with the following id(s):`
  );
  console.log(result.insertedIds);
}
