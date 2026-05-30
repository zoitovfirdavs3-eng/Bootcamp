// books = books.slice(0, 50);
const elBookList = document.querySelector(".js-book-list");
const elBookTemp = document.querySelector(".js-book-temp").content;
const elForm = document.querySelector(".js-form");
const elCountrySelect = elForm.querySelector(".js-country-select");
const elBookmarkBtn = document.querySelector(".js-bookmark-btn");
const elBookmarkTemp = document.querySelector(".js-bookmark-temp").content;
const elBookmarkList = document.querySelector(".js-bookmark-list");

const bookmarkStorage = window.localStorage.getItem("bookmark");
const bookmark = bookmarkStorage ? JSON.parse(bookmarkStorage) : [];

const handleRenderBooks = (arr) => {
  elBookList.innerHTML = "";
  const docFrag = new DocumentFragment();
  arr.forEach((book) => {
    const originalIndex = books.indexOf(book);
    const cloneBookTemp = elBookTemp.cloneNode(true);
    cloneBookTemp.querySelector(".js-book-image").src = book.imageLink;
    cloneBookTemp.querySelector(".js-book-title").textContent = book.title;
    cloneBookTemp.querySelector(".js-book-author").textContent = book.author;
    cloneBookTemp.querySelector(".js-book-year").textContent = book.year;
    cloneBookTemp.querySelector(".js-book-pages").textContent = book.pages;
    cloneBookTemp.querySelector(".js-book-language").textContent =
      book.language;
    cloneBookTemp.querySelector(".js-about-link").href = book.link;
    cloneBookTemp.querySelector(".js-bookmark").dataset.id = originalIndex;
    docFrag.append(cloneBookTemp);
  });
  elBookList.append(docFrag);
};

const handleFilterCountries = (arr) => {
  const result = [];
  for (let book of arr) {
    const bookCoutnry = book.country;
    if (!result.includes(bookCoutnry)) {
      result.push(bookCoutnry);
    }
  }
  return result;
};

const handleCreateCountryOption = () => {
  const countries = handleFilterCountries(books);
  for (let country of countries) {
    const newOption = document.createElement("option");
    newOption.textContent = country;
    newOption.value = country;
    elCountrySelect.append(newOption);
  }
};

handleCreateCountryOption();

const sortObj = {
  az: (a, b) => a.title.localeCompare(b.title),
  za: (a, b) => b.title.localeCompare(a.title),
  "old-year": (a, b) => a.year - b.year,
  "new-year": (a, b) => b.year - a.year,
};

const handleSearchBook = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  
  const searchRegex = new RegExp(search.value, "gi");
  const searchAuthorRegex = new RegExp(author.value, "gi");

  const searchBooks = books.filter((book) => {
    return (
      (search.value == "" || book.title.match(searchRegex)) &&
      (author.value == "" || book.author.match(searchAuthorRegex)) &&
      (minYear.value == "" || book.year >= minYear.value) &&
      (maxYear.value == "" || book.year <= maxYear.value) &&
      (country.value == "all" || book.country.includes(country.value))
    );
  });

  searchBooks.sort(sortObj[sort.value]);
  handleRenderBooks(searchBooks);
};

elForm.addEventListener("submit", handleSearchBook);

const handleRenderBookmarkBooks = (arr) => {
  elBookmarkList.innerHTML = "";
  const docFrag = new DocumentFragment();
  arr.forEach((book) => {
    const originalIndex = books.indexOf(book);
    const cloneTemp = elBookmarkTemp.cloneNode(true);
    cloneTemp.querySelector(".js-book-image").src = book.imageLink;
    cloneTemp.querySelector(".js-book-title").textContent = book.title;
    cloneTemp.querySelector(".js-book-author").textContent = book.author;
    cloneTemp.querySelector(".js-book-year").textContent = book.year;
    cloneTemp.querySelector(".js-book-pages").textContent = book.pages;
    cloneTemp.querySelector(".js-book-language").textContent = book.language;
    cloneTemp.querySelector(".js-about-link").href = book.link;
    cloneTemp.querySelector(".js-remove-btn").dataset.id = originalIndex;
    docFrag.append(cloneTemp);
  });
  elBookmarkList.append(docFrag);
};

const handleBookClick = (evt) => {
  const elTarget = evt.target;
  if (elTarget.matches(".js-bookmark")) {
    const bookId = +elTarget.dataset.id;
    const checkBook = bookmark.some((book) => books.indexOf(book) === bookId);
    if (!checkBook) {
      const findBook = books[bookId];
      bookmark.push(findBook);
      window.localStorage.setItem("bookmark", JSON.stringify(bookmark));
      handleRenderBookmarkBooks(bookmark);
      elTarget.src = "/Exams/2-exam/icons/star.svg"
    } else {
      alert("Bu kitob allaqachon qo'shilgan");
    }
  }
};

elBookList.addEventListener("click", handleBookClick);

const handleRemoveBookmark = (evt) => {
  const elTarget = evt.target.closest(".js-remove-btn"); // closest qo'shildi
  if (!elTarget) return;

  const id = +elTarget.dataset.id;
  const findIndex = bookmark.findIndex((book) => books.indexOf(book) === id);

  if (findIndex !== -1) {
    bookmark.splice(findIndex, 1);
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
    handleRenderBookmarkBooks(bookmark);

    elBookList.querySelector(`.js-bookmark[data-id="${id}"]`).src = "/Exams/2-exam/icons/star-border.svg"
  }
};

elBookmarkList.addEventListener("click", handleRemoveBookmark);

handleRenderBooks(books);
handleRenderBookmarkBooks(bookmark);