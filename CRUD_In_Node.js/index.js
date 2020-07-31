import makeDb from "./connection";

const operation = "READ_ONE_BY_NAME";
makeDb(operation).catch((err) => {
  console.log(err);
});
