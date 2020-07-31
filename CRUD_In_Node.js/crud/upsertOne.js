async function upsertOneByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne(
      { name: nameOfListing },
      { $set: updatedListing },
      { upsert: true }
    );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);

  if (result.upsertedCount > 0) {
    console.log(
      `One document was inserted with the id ${result.upsertedId._id}`
    );
  } else {
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  }
}

export default upsertOneByName;
