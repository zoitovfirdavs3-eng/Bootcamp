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
  elMoviesList.innerHTML = "";
  const docFragment = document.createDocumentFragment();
  for (let movie of films) {
    const cloneTemp = elTemp.content.cloneNode(true);
    cloneTemp.querySelector("img").src = movie.poster;
    cloneTemp.querySelector("h3").textContent = movie.title;
    cloneTemp.querySelector("p").textContent = movie.overview;
    cloneTemp.querySelector("h4").textContent = movie.genres.join(", ");

    docFragment.append(cloneTemp);
  }
  elMoviesList.append(docFragment);
}

handleRenderMovies(films);

// Search by name funksiyasi
const handleSearchFn = function (evt) {
  evt.preventDefault();
  let val = elInpName.value;
  let searchRegex = new RegExp(val, "gi");
  let filterMoviesByName = films.filter(function (film) {
    return film.title.match(searchRegex);
  });
  handleRenderMovies(filterMoviesByName);
};

elForm.addEventListener("submit", handleSearchFn);

// Search by select genre funksiya
const handleSelectSearchFn = function (evt) {
  evt.preventDefault();
  let val = elSelectGenre.value;
  if (val == "All") return handleRenderMovies(films);
  let filterMoviesByGenre = films.filter(function (film) {
    return film.genres.includes(val);
  });
  handleRenderMovies(filterMoviesByGenre);
};

elSelectGenre.addEventListener("change", handleSelectSearchFn);
