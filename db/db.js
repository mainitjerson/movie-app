import mongodb from 'mongodb';
import env from 'dotenv'
import ReviewsDAO from '../dao/reviewsDAO.js';

env.config();

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.MONGODB_USERNAME;
const mongo_password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@reviewdb.fysgy.mongodb.net/?retryWrites=true&w=majority`

let dbInstance;

export const connectToDatabase = async () => {
    if (dbInstance) return dbInstance; // Return existing instance if already connected

    try {
        const client = await MongoClient.connect(uri, {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
        });
        dbInstance = client.db('reviewdb'); // Set the database instance
        await ReviewsDAO.injectDB(client);
        console.log('Connected to MongoDB');
        return dbInstance;
    } catch (err) {
        console.error('Failed to connect to the database:', err.stack);
        throw err; // Rethrow the error for handling in the main server
    }
};