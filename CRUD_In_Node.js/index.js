import makeDb from "./connection";

const operation = "READ";
makeDb(operation).catch((err) => {
  console.log(err);
});
