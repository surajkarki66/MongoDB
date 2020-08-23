import app from "./server";
import { MongoClient } from "mongodb";
require("dotenv").config();
const port = process.env.PORT || 8000;

MongoClient.connect(process.env.MFLIX_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
