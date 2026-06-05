const elBookList = document.querySelector(".js-book-list");
const elBookTemp = document.querySelector(".js-book-temp").content;
const elForm = document.querySelector(".js-form");
const elCountrySelect = elForm.querySelector(".js-country-select");
const elBookmarkTemp = document.querySelector(".js-bookmark-temp").content;
const elBookmarkList = document.querySelector(".js-bookmark-list");
const elBookmarkLink = document.querySelector(".js-bookmark-link");
const elBookmarkCount = document.querySelector(".js-bookmark-count");

const bookmarkStorage = window.localStorage.getItem("bookmark");
const bookmark = bookmarkStorage ? JSON.parse(bookmarkStorage) : [];

const updateBookmarkCount = () => {
  elBookmarkCount.textContent = bookmark.length;
};

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

    const bookmarkImg = cloneBookTemp.querySelector(".js-bookmark");
    bookmarkImg.dataset.id = originalIndex;

    const isBookmarked = bookmark.some(
      (b) => books.indexOf(b) === originalIndex,
    );
    bookmarkImg.src = isBookmarked
      ? "/icons/star.svg"
      : "/icons/star-border.svg";

    docFrag.append(cloneBookTemp);
  });
  elBookList.append(docFrag);
};

const handleFilterCountries = (arr) => {
  const result = [];
  for (let book of arr) {
    if (!result.includes(book.country)) {
      result.push(book.country);
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

  // ✅ FormData to'g'ri ishlatildi
  const formData = new FormData(evt.target);
  const searchVal = formData.get("search");
  const authorVal = formData.get("author");
  const minYearVal = formData.get("minYear");
  const maxYearVal = formData.get("maxYear");
  const countryVal = formData.get("country") || "all";
  const sortVal = formData.get("sort");

  const searchRegex = new RegExp(searchVal, "gi");
  const searchAuthorRegex = new RegExp(authorVal, "gi");

  const searchBooks = books.filter((book) => {
    return (
      (searchVal === "" || book.title.match(searchRegex)) &&
      (authorVal === "" || book.author.match(searchAuthorRegex)) &&
      (minYearVal === "" || book.year >= +minYearVal) &&
      (maxYearVal === "" || book.year <= +maxYearVal) &&
      (countryVal === "all" || book.country.includes(countryVal))
    );
  });

  searchBooks.sort(sortObj[sortVal]);
  handleRenderBooks(searchBooks);
};

elForm.addEventListener("submit", handleSearchBook);

const handleRenderBookmarkBooks = (arr) => {
  elBookmarkList.innerHTML = "<h2>Bookmarked Books</h2>";
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
  updateBookmarkCount();
};

const handleBookClick = (evt) => {
  const elTarget = evt.target;
  if (elTarget.matches(".js-bookmark")) {
    const bookId = +elTarget.dataset.id;
    const checkBook = bookmark.some((book) => books.indexOf(book) === bookId);
    if (!checkBook) {
      bookmark.push(books[bookId]);
      window.localStorage.setItem("bookmark", JSON.stringify(bookmark));
      handleRenderBookmarkBooks(bookmark);
      elTarget.src = "/icons/star.svg";
    } else {
      alert("Bu kitob allaqachon qo'shilgan");
    }
  }
};

elBookList.addEventListener("click", handleBookClick);

const handleRemoveBookmark = (evt) => {
  const elTarget = evt.target.closest(".js-remove-btn");
  if (!elTarget) return;

  const id = +elTarget.dataset.id;
  const findIndex = bookmark.findIndex((book) => books.indexOf(book) === id);

  if (findIndex !== -1) {
    bookmark.splice(findIndex, 1);
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
    handleRenderBookmarkBooks(bookmark);

    const bookmarkImg = elBookList.querySelector(
      `.js-bookmark[data-id="${id}"]`,
    );
    if (bookmarkImg) bookmarkImg.src = "/icons/star-border.svg";
  }
};

elBookmarkList.addEventListener("click", handleRemoveBookmark);

elBookmarkLink.addEventListener("click", (evt) => {
  evt.preventDefault();
  elBookmarkList.classList.toggle("show");
});

handleRenderBooks(books);
handleRenderBookmarkBooks(bookmark);
updateBookmarkCount();