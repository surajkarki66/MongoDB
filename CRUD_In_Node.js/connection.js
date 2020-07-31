import mongodb from "mongodb";

import singleData from "./data/singleData";
import multipleData from "./data/multipleData";

import listDatabase from "./listDatabase";
import insertOne from "./crud/insertOne";
import insertMany from "./crud/insertMany";

import readOneByName from "./crud/readOneByName";
import readMany from "./crud/readMany";
import read from "./crud/read";

export default async function makeDb(action) {
  const MongoClient = mongodb.MongoClient;
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const c = await client.connect();
    switch (action) {
      case "INSERTONE":
        await insertOne(c, singleData);
        break;

      case "INSERTMANY":
        await insertMany(client, multipleData);
        break;

      case "READ_ONE_BY_NAME":
        await readOneByName(c, { name: "Kings House" });
        break;

      case "READ_MANY":
        await readMany(c, {
          bedrooms: { $gte: 2 },
          bathrooms: { $gte: 2 },
        });
        break;

      case "READ":
        await read(c, {
          minimumNumberOfBedrooms: 2,
          minimumNumberOfBathrooms: 2,
          maximumNumberOfResults: 5,
        });
        break;

      default:
        // Listing the databases
        await listDatabase(c);
    }
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
