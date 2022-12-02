const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017/test");
async function getBooks(id) {
  await client.connect();
  const db = client.db();
  const genre = await db.collection("generos").findOne({ _id: ObjectId(id) });
  const books = await db
    .collection("libros")
    .find({ genre: genre.name })
    .toArray();
  console.log(books);
}

getBooks("6381284df008e01ceba63f7a")
  .catch(console.log)
  .finally(() => client.close());
