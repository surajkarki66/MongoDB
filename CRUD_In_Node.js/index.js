import makeDb from "./connection";
makeDb().catch((err) => {
  console.log(err);
});
