// const token = localStorage.getItem("token");
// if (!token) {
//   window.location.replace("login.html");
// }

const elForm = document.querySelector(".js-form");
const elSearchInput = document.querySelector("#searchInput");
const elRegionFilter = document.querySelector("#regionFilter");
const elSortSelect = document.querySelector("#sortSelect");
const elCountryList = document.querySelector("#countriesContainer");
const elCountryTemplate = document.querySelector("#cardTemplate").content;
const elDarkModeBtn = document.querySelector("#darkModeBtn");
const elModal = document.querySelector("#modal");
const elCloseModal = document.querySelector("#closeModal");
const elModalBody = document.querySelector("#modalBody");

let likedCountries = JSON.parse(localStorage.getItem("likedCountries")) || [];

const createLogoutBtn = () => {
  const header = document.querySelector(".header");
  if (!header) return;
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "🚪 Logout";
  logoutBtn.style.marginLeft = "10px";
  logoutBtn.style.padding = "8px 15px";
  logoutBtn.style.cursor = "pointer";
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("login.html");
  });
  header.appendChild(logoutBtn);
};
createLogoutBtn();

const handleRenderCountry = (arr) => {
  try {
    elCountryList.innerHTML = "";
    const docFrag = new DocumentFragment();

    arr.forEach((country) => {
      const countryName = country.name?.common || "Unknown Country";
      const rawPopulation = country.population || Math.floor(Math.random() * 50000000) + 1000000;
      const population = rawPopulation.toLocaleString();
      const region = country.region || "N/A";
      const capital = country.capital && country.capital[0] ? country.capital[0] : "No Capital";
      const countryCode = country.cca2 ? country.cca2.toLowerCase() : "uz";
      const flagSrc = `https://flagcdn.com/w320/${countryCode}.png`;

      const cloneCountryTemp = elCountryTemplate.cloneNode(true);
      const cardEl = cloneCountryTemp.querySelector(".card");
      
      cardEl.dataset.name = countryName;
      
      cloneCountryTemp.querySelector(".card-flag").src = flagSrc;
      cloneCountryTemp.querySelector(".card-flag").alt = `${countryName} flag`;
      cloneCountryTemp.querySelector(".card-title").textContent = countryName;
      cloneCountryTemp.querySelector(".card-population").textContent = population;
      cloneCountryTemp.querySelector(".card-region").textContent = region;
      cloneCountryTemp.querySelector(".card-capital").textContent = capital;

      const likeBtn = cloneCountryTemp.querySelector(".like-btn");
      if (likedCountries.includes(countryName)) {
        likeBtn.textContent = "❤️";
        likeBtn.classList.add("liked");
      } else {
        likeBtn.textContent = "🤍";
        likeBtn.classList.remove("liked");
      }

      docFrag.append(cloneCountryTemp);
    });

    elCountryList.append(docFrag);
  } catch (err) {
    console.log(err);
  }
};

const sortObj = {
  name_asc: (a, b) => (a.name?.common || "").localeCompare(b.name?.common || ""),
  name_desc: (b, a) => (a.name?.common || "").localeCompare(b.name?.common || ""),
  "pop-asc": (a, b) => (a.population || 0) - (b.population || 0),
  "pop-desc": (b, a) => (a.population || 0) - (b.population || 0),
};

const handleSearchCountry = (evt) => {
  try {
    if (evt) evt.preventDefault();

    const formData = new FormData(elForm);
    const searchVal = (formData.get("search") || "").toLowerCase().trim();
    const regionVal = formData.get("region") || "";
    const sortVal = formData.get("sort") || "";

    let filteredCountries = countries.filter((country) => {
      const name = (country.name?.common || "").toLowerCase();
      const region = country.region || "";

      return (
        (searchVal === "" || name.includes(searchVal)) &&
        (regionVal === "" || region === regionVal)
      );
    });

    if (sortVal && sortObj[sortVal]) {
      filteredCountries = [...filteredCountries].sort(sortObj[sortVal]);
    }

    handleRenderCountry(filteredCountries);
  } catch (err) {
    console.log(err);
  }
};

elForm.addEventListener("submit", handleSearchCountry);

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  elDarkModeBtn.textContent = "☀️ Light Mode";
} else {
  elDarkModeBtn.textContent = "🌙 Dark Mode";
}

elDarkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    elDarkModeBtn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    elDarkModeBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

const handleOpenCountryModal = (countryName) => {
  try {
    const country = countries.find((c) => c.name?.common === countryName);
    if (!country) return;

    const countryCode = country.cca2 ? country.cca2.toLowerCase() : "uz";
    const flagSrc = `https://flagcdn.com/w320/${countryCode}.png`;
    
    const rawPopulation = country.population || 15000000;
    const officialName = country.name?.official || country.name?.common || "N/A";
    const subregion = country.subregion || "N/A";
    const currencyKey = country.currencies ? Object.keys(country.currencies)[0] : null;
    const currencyName = currencyKey ? country.currencies[currencyKey].name : "N/A";
    const currencySymbol = currencyKey ? country.currencies[currencyKey].symbol : "";

    elModalBody.innerHTML = `
      <div style="text-align: center;">
        <img src="${flagSrc}" alt="${countryName} flag" style="width: 100%; max-height: 200px; object-fit: contain; margin-bottom: 20px;" />
        <h2>${countryName}</h2>
        <p style="margin: 8px 0;"><b>Official Name:</b> ${officialName}</p>
        <p style="margin: 8px 0;"><b>Region:</b> ${country.region || "N/A"}</p>
        <p style="margin: 8px 0;"><b>Subregion:</b> ${subregion}</p>
        <p style="margin: 8px 0;"><b>Capital:</b> ${country.capital && country.capital[0] ? country.capital[0] : "No Capital"}</p>
        <p style="margin: 8px 0;"><b>Population:</b> ${rawPopulation.toLocaleString()}</p>
        <p style="margin: 8px 0;"><b>Currency:</b> ${currencyName} (${currencySymbol})</p>
      </div>
    `;

    elModal.classList.remove("hidden");
  } catch (err) {
    console.log(err);
  }
};

elCountryList.addEventListener("click", (evt) => {
  try{
    if (evt.target.classList.contains("like-btn")) {
      evt.stopPropagation();
      const clickedCard = evt.target.closest(".card");
      if (!clickedCard) return;
      
      const countryName = clickedCard.dataset.name;
      const likeBtn = evt.target;
  
      if (likedCountries.includes(countryName)) {
        likedCountries = likedCountries.filter(name => name !== countryName);
        likeBtn.textContent = "🤍";
        likeBtn.classList.remove("liked");
      } else {
        likedCountries.push(countryName);
        likeBtn.textContent = "❤️";
        likeBtn.classList.add("liked");
      }
      
      localStorage.setItem("likedCountries", JSON.stringify(likedCountries));
      return; 
    }
  
    const clickedCard = evt.target.closest(".card");
    if (clickedCard) {
      const countryName = clickedCard.dataset.name;
      handleOpenCountryModal(countryName);
    }
  }catch(err){
    console.log(err)
  }
});

elCloseModal.addEventListener("click", () => {
  elModal.classList.add("hidden");
});

window.addEventListener("click", (evt) => {
  if (evt.target === elModal) {
    elModal.classList.add("hidden");
  }
});

handleRenderCountry(countries);