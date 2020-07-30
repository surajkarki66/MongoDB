import mongodb from "mongodb";

import listDatabase from "./listDatabase";
import insertOne from "./crud/insertOne";

export default async function makeDb() {
  const MongoClient = mongodb.MongoClient;
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const c = await client.connect();
    // Listing the databases
    await listDatabase(c);

    // Inserting Single Element
    await insertOne(c, {
      name: "Kings House",
      summary: "A great house in Nepal.",
      bedrooms: 2,
      bathrooms: 2,
    });
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
