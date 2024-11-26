import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn){
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db('reviews').collection('reviews')
        } catch (err) {
            console.log(`Unable to established connection handles in userDAO: ${err}`); 
        }
    }

    static async addReview(movieId, user, review){
        try {
            const reviewDoc = {
                movieId: movieId,
                user:user,
                review: review
            }
            return await reviews.insertOne(reviewDoc)
        } catch (err) {
            console.log(`Unable to post review: ${err}`);
        }
    } 

    static async getReview(reviewId){
        try {
            return await reviews.findOne({ _id:  ObjectId(reviewId) })
        } catch (error) {
            console.log(`Unable to get review: ${error}`);
        }
    }
    static async updateReview(reviewId, user, review){
        try {
            const updateResponse = await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user: user, review: review } }
            )
            return updateResponse;
        } catch (error) {
            console.log(`Unable to update review: ${error}`);
        }
    }
    
    static async deleteReview(reviewId){
        try {
            const deleteResponse = await reviews.deleteOne({ _id: new ObjectId(reviewId), })
            return deleteResponse;
        } catch (error) {
            console.log(`Unable to delete review: ${error}`);
        }
    }
    static async getReviewsByMovieId(movieId){
        try {
            const cursor = await reviews.find({ movieId: parseInt(movieId) })
            return cursor.toArray()
        } catch (error) {
            console.log(`Unable to get reviews by movieId: ${error}`);
        }
    }
}