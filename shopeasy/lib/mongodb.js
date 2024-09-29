// lib/mongodb.js

// Create a MongoDB connection utility

import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/'; // Your MongoDB connection string


let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;

/*

Summary
1. Set up MongoDB and ensure it's running on your localhost.
2. Install the MongoDB package.
3. Create a MongoDB connection utility.
4. Create an API route in the app directory to fetch data from MongoDB.
5. Fetch data in your Next.js server components using the API route.

*/