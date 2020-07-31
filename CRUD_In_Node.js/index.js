import makeDb from "./connection";

const operation = "UPDATEONE";
makeDb(operation).catch((err) => {
  console.log(err);
});
