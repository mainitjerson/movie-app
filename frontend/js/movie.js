const url = new URL(location.href);
const movieId = url.searchParams.get('id');
const movieTitle = url.searchParams.get('title');

const API_URL = 'http://localhost:3000/api/v1/reviews/';

const main = document.querySelector('section');
const title = document.querySelector('#title');

title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML = `
        <h1>New Review</h1>
        <form>
            <input type="text" id="new_user" value="" placeholder="Your Name">
            <textarea type="text" id="new_review" value="" placeholder="Your Review"></textarea>
            <div class="button"><a href="#" onclick="saveReview('new_review', 'new_user')">Save Review</a></div>
        </form>
    `
    div_new.classList.add('container')
    main.appendChild(div_new)

    returnReviews(API_URL);

    async function returnReviews(url) {
        try {
            const response = await fetch(url + "movie/" + movieId);
            const data = await response.json();
    
            data.forEach(review => {
                const div_card = document.createElement('div');
                div_card.innerHTML = `
                        <div class="review-card" id="${review._id}">
                            <div class="review-content">
                                <p class="review-text"><strong>Review:</strong> ${review.review}</p>
                                <p class="review-user"><strong>User:</strong> ${review.user}</p>
                            </div>
                            <div class="review-actions">
                                <a href="#" class="button edit-btn" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">Edit</a>
                                <a href="#" class="button delete-btn" onclick="deleteReview('${review._id}')">Delete</a>
                            </div>
                        </div>
                    
                `;
                div_card.classList.add('review-container')
                main.appendChild(div_card);
            });
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    async function editReview(id, review, user) {
        const element = document.getElementById(id);
        const reviewInputId = "review" + id;
        const userInputId = "user" + id;
    
        element.innerHTML = `
            <p><strong>Review: </strong>
                <input type="text" id="${reviewInputId}" value="${review}">
            </p>
            <p><strong>User: </strong>
                <input type="text" id="${userInputId}" value="${user}">
            </p>
            <div class="button"><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">Save</a></div>
        `;
    }
    
    async function saveReview(reviewInputId, userInputId, id = "") {
        const review = document.getElementById(reviewInputId).value;
        const user = document.getElementById(userInputId).value;
    
        try {
            let response;
            if (id) {
                response = await fetch(API_URL + id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "user": user, "review": review })
                });
            } else {
                response = await fetch(API_URL + "new", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "user": user, "review": review, "movieId": movieId })
                });
            }
    
            const res = await response.json();
            console.log(res);
            location.reload();
        } catch (error) {
            console.error('Error saving review:', error);
        }
    }
    
    async function deleteReview(id) {
        try {
            const response = await fetch(API_URL + id, {
                method: 'DELETE'
            });
            const res = await response.json();
            console.log(res);
            location.reload();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    }