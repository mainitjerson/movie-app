const API_KEY ="133d7ce4608ec6f0d1c1d5b28dc917d7"
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH =`https://image.tmdb.org/t/p/w500`
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`

const main = document.querySelector('section');
const form = document.querySelector('form');
const query = document.querySelector('#query');

getMovies(API_URL)
async function getMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        main.innerHTML = '';
        let moviesHTML = ''; 

        data.results.forEach(movie => {
            console.log(movie);
            moviesHTML += `<div class="row">
                    <div class="card">
                        <img class="movie-img" src="${IMG_PATH + movie.poster_path}" alt="${movie.title} poster">
                        <h2 class="movie-title">${movie.title}</h2>
                        <br>
                        <a class="review" href="pages/movie.html?id=${movie.id}&title=${movie.title}" >Reviews</a>
                    </div>
            </div>`;
        });

        main.innerHTML = moviesHTML;
    }
    catch(err){
        console.log(err)
    }
}
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    main.innerHTML = '';
    let moviesHTML = ''; 
    main.innerHTML = moviesHTML;
    const searchMovie = query.value
    
    if(searchMovie){
        getMovies(SEARCH_API + searchMovie);
        query.value="";
    }

})



