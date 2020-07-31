async function readMany(client, query) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find(query)
    .toArray();

  if (result) {
    console.log("Result:");
    console.log(result);
  } else {
    console.log("Not Found.");
  }
}

export default readMany;
