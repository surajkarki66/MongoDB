import mongodb from "mongodb";

import singleData from "./data/singleData";
import multipleData from "./data/multipleData";

import listDatabase from "./listDatabase";
import insertOne from "./crud/create/insertOne";
import insertMany from "./crud/create/insertMany";

import readOneByName from "./crud/read/readOneByName";
import readMany from "./crud/read/readMany";
import read from "./crud/read/read";

import updateOne from "./crud/update/updateOne";
import upsertOne from "./crud/update/upsertOne";
import updateMany from "./crud/update/updateMany";

import deleteOne from "./crud/delete/deleteOne";
import deleteMany from "./crud/delete/deleteMany";

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

      case "UPDATEONE":
        await updateOne(client, "Solti Hotel", { beds: 2 });
        break;

      case "UPSERTONE":
        await upsertOne(c, "Cozy Cottage", {
          name: "Cozy Cottage",
          bedrooms: 2,
          bathrooms: 1,
        });
        break;

      case "UPDATEMANY":
        await updateMany(c);
        break;

      case "DELETEONE":
        await deleteOne(c, "Cozy Cottage");
        break;

      case "DELETEMANY":
        await deleteMany(client, new Date("2019-02-15"));
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
