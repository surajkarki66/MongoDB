import mongodb from "mongodb";

import listDatabase from "./listDatabase";

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
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
