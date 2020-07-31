import makeDb from "./connection";

const operation = "INSERTMANY";
makeDb(operation).catch((err) => {
  console.log(err);
});
