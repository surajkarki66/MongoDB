export default async function listDatabase(client) {
  const databaseList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databaseList.databases.forEach((db) => console.log(` ${db.name}`));
}
