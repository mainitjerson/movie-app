import express from 'express';
import cors from 'cors';
import reviews from './api/review.route.js';
import { connectToDatabase } from '../db/db.js';

const app = express();
const port = process.env.PORT || 3000;
//middleware
app.use(cors());
app.use(express.json());
//routes
app.use('/api/v1/reviews', reviews);
//catch route error
app.use('*', (req,res)=>
    res.status(404).json({message: 'Route not found'}));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});
// Start the server and connect to the database
const startServer = async () => {
    try {
        await connectToDatabase(); // Connect to the database
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Server failed to start:', err.stack);
        process.exit(1);
    }
};

startServer();
export default app;