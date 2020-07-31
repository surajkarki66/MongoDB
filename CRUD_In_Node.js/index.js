import makeDb from "./connection";

const operation = "READ_MANY";
makeDb(operation).catch((err) => {
  console.log(err);
});
