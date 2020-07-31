import mongodb from "mongodb";

import listDatabase from "./listDatabase";
import insertOne from "./crud/insertOne";
import insertMany from "./crud/insertMany";

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
        // Inserting Single Element
        await insertOne(c, {
          name: "Kings House",
          summary: "A great house in Nepal.",
          bedrooms: 2,
          bathrooms: 2,
        });
        break;

      case "INSERTMANY":
        await insertMany(client, [
          {
            name: "Infinite Views",
            summary: "Modern home with infinite views from the infinity pool",
            property_type: "House",
            bedrooms: 5,
            bathrooms: 4.5,
            beds: 5,
          },
          {
            name: "Private room in London",
            property_type: "Apartment",
            bedrooms: 1,
            bathroom: 1,
          },
          {
            name: "Beautiful Beach House",
            summary:
              "Enjoy relaxed beach living in this house with a private beach",
            bedrooms: 4,
            bathrooms: 2.5,
            beds: 7,
            last_review: new Date(),
          },
        ]);
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
