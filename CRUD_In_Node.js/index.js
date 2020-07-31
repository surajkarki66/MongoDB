import makeDb from "./connection";

const operation = "DELETEMANY";
makeDb(operation).catch((err) => {
  console.log(err);
});
