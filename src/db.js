import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.DATABASE);
    console.log("MongoDB database successfully connected.")
  } catch (error) {
    console.log("Error connecting to MongoDB database.");
    console.log(error);
  }
  
  export default db;
