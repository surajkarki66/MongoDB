import makeDb from "./connection";

const operation = "UPDATEMANY";
makeDb(operation).catch((err) => {
  console.log(err);
});
