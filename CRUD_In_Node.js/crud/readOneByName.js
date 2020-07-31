async function readOneListingByName(client, query) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne(query);

  if (result) {
    console.log(
      `Found a listing in the collection with the name '${query.name}':`
    );
    console.log(result);
  } else {
    console.log(`No listings found with the name '${query.name}'`);
  }
}

export default readOneListingByName;
