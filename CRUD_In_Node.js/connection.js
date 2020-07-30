import mongodb from "mongodb";

export default async function makeDb() {
  const MongoClient = mongodb.MongoClient;
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const c = await client.connect();
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
