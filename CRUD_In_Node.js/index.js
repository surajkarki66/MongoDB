import makeDb from "./connection";

const operation = "UPSERTONE";
makeDb(operation).catch((err) => {
  console.log(err);
});
