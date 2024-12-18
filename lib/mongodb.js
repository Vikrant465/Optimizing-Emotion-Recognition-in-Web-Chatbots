import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // MongoDB connection string
const options = {};

let client;
let clientPromise;

// Caching the connection
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;