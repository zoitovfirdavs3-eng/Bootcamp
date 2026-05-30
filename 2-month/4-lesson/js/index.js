movies = movies.slice(0, 50);
const elMovieList = document.querySelector(".js-movie-list");
const elMovieTemp = document.querySelector(".js-movie-template").content;
const elForm = document.querySelector(".js-form");
const elCategorySelect = elForm.querySelector(".js-categories-select");

const handleRenderMovies = (arr) => {
    elMovieList.innerHTML = '';
    const docFrag = new DocumentFragment();
    arr.forEach(movie => {
        const cloneMovieTemp = elMovieTemp.cloneNode(true);
        cloneMovieTemp.querySelector(".js-movie-image").src = movie.img_url;
        cloneMovieTemp.querySelector(".js-movie-title").textContent = movie.title;
        cloneMovieTemp.querySelector(".js-movie-rating").textContent = movie.imdb_rating;
        cloneMovieTemp.querySelector(".js-movie-year").textContent = movie.movie_year;
        cloneMovieTemp.querySelector(".js-movie-runtime").textContent = movie.runtime
        cloneMovieTemp.querySelector(".js-movie-text").textContent = movie.categories.join(", ");
        docFrag.append(cloneMovieTemp);
    });
    elMovieList.append(docFrag);
};

const handleFilterCategory = (arr) => {
    const result = [];
    for(let movie of arr){
        const movieCategory = movie.categories;
        for(let category of movieCategory){
            if(!result.includes(category)){
                result.push(category);
            }
        }
    };
    return result;
};

const handleCreateCategoryOption = () => {
    const categories = handleFilterCategory(movies);
    for(let category of categories){
        const newOption = document.createElement("option");
        newOption.textContent = category;
        newOption.value = category;
        elCategorySelect.append(newOption)
    }
}

handleCreateCategoryOption()

const handleSearchMovie = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const inpVal = formData.get("search");
    const searchRegex = new RegExp(inpVal, "gi");
    const searchmovies = movies.filter(movie => movie.title.match(searchRegex));
    handleRenderMovies(searchmovies);
}

elForm.addEventListener("submit", handleSearchMovie);

handleRenderMovies(movies);