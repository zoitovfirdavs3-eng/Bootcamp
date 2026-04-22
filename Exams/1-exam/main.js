// Bu script fileda moviesni JS codelari yoziladi
// console.log(films)
// cloneNode docFragment

const elTemp = document.querySelector(".js-temp");
const elForm = document.querySelector(".js-form");
const elInpName = elForm.querySelector(".js-name-inp");
const elSelectGenre = elForm.querySelector(".js-select");
const elMoviesList = document.querySelector(".js-movies-list");

// Movie larni render qilish
function handleRenderMovies(films) {
  const docFragment = document.createDocumentFragment();
  for (let movie of films) {
    const cloneTemp = elTemp.content.cloneNode(true);
    const movieImage = cloneTemp.querySelector("img").src = movie.poster;
    const movieName = cloneTemp.querySelector("h3").textContent = movie.title;
    const movieDescription = cloneTemp.querySelector("p").textContent = movie.overview;
    const movieGenre = cloneTemp.querySelector("h4").textContent = movie.genres;

    docFragment.append(cloneTemp);
  }
  elMoviesList.append(docFragment);
}

handleRenderMovies(films);

// Search by name funksiyasi
const handleSearchFn = function (evt) {
  evt.preventDefault();
  elMoviesList.innerHTML = "";
  let val = elInpName.value;
  let searchRegex = new RegExp(val, "gi");
  let filterMoviesByName = films.filter(function (film) {
    return film.title.match(searchRegex);
  });
  handleRenderMovies(filterMoviesByName);
};

elInpName.addEventListener("keyup", handleSearchFn);

// Search by select genre funksiya
const handleSelectSearchFn = function(evt){
    evt.preventDefault();
    elMoviesList.innerHTML = '';
    let val = elSelectGenre.value;
    if(val == "All") return handleRenderMovies(films)
    let filterMoviesByGenre = films.filter(function(film){
        // Bu yerda for ishlatganimning sababi -> faqatgina bitta janrga ega bolgan kinoni chiqarmasligi uchun va for yordamida shu janr qatnashgan barcha kinoni olsa boladi
        for(let genre of film.genres){
            return genre == val
        }
    });
    handleRenderMovies(filterMoviesByGenre)
}

elSelectGenre.addEventListener("change", handleSelectSearchFn);