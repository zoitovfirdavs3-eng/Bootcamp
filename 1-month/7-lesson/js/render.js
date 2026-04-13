const elFrom = document.querySelector(".js-form");
const elNameInp = elFrom.querySelector(".js-name-inp");
const elTypeInp = elFrom.querySelector(".js-type-inp");
const elResult = document.querySelector(".js-pokemons-list");

const renderFn = (arr) => {
  for (let pokemon of arr) {
    let newLi = document.createElement("li");
    let newDiv = document.createElement("div");
    let newName = document.createElement("h2");
    let newId = document.createElement("span");
    let newImg = document.createElement("img");
    let newType = document.createElement("p");

    newLi.classList.add("pokemon-card");
    newName.classList.add("pokemon-name");
    newId.classList.add("pokemon-id");
    newImg.classList.add("pokemon-img");
    newType.classList.add("pokemon-type");

    newName.textContent = `Ismi: ${pokemon.name}`;
    newId.textContent = `Raqami: ${pokemon.id}`;
    newImg.src = pokemon.img;
    newType.textContent = `Sehrli kuchi: ${pokemon.type}`;

    newDiv.append(newName, newId, newImg, newType);
    newLi.append(newDiv);
    elResult.append(newLi);
  }
};

renderFn(pokemons);

elNameInp.addEventListener("keyup", (evt) => {
  evt.preventDefault();
  elResult.innerHTML = "";
  let val = elNameInp.value.trim();
  if (!val) return renderFn(pokemons);
  let searchRegex = new RegExp(val, "gi");
  let filterPokemons = pokemons.filter(function (pokemon) {
    return pokemon.name.match(searchRegex);
  });
  for (let fPok of filterPokemons) {
    let newLi = document.createElement("li");
    let newDiv = document.createElement("div");
    let newName = document.createElement("h2");
    let newId = document.createElement("span");
    let newImg = document.createElement("img");
    let newType = document.createElement("p");

    newLi.classList.add("pokemon-card");
    newName.classList.add("pokemon-name");
    newId.classList.add("pokemon-id");
    newImg.classList.add("pokemon-img");
    newType.classList.add("pokemon-type");

    newName.textContent = `Ismi: ${fPok.name}`;
    newId.textContent = `Raqami: ${fPok.id}`;
    newImg.src = fPok.img;
    newType.textContent = `Sehrli kuchi: ${fPok.type}`;

    newDiv.append(newName, newId, newImg, newType);
    newLi.append(newDiv);
    elResult.append(newLi);
  }
});

elTypeInp.addEventListener("keyup", (evt) => {
  evt.preventDefault();
  elResult.innerHTML = "";
  let val = elTypeInp.value.trim();
  if (!val) return renderFn(pokemons);
  let searchRegex = new RegExp(val, "gi");
  let filterPokemons = pokemons.filter(function (pokemon) {
    return pokemon.type.some((p) => p.match(searchRegex));
  });
  for (let fPok of filterPokemons) {
    let newLi = document.createElement("li");
    let newDiv = document.createElement("div");
    let newName = document.createElement("h2");
    let newId = document.createElement("span");
    let newImg = document.createElement("img");
    let newType = document.createElement("p");

    newLi.classList.add("pokemon-card");
    newName.classList.add("pokemon-name");
    newId.classList.add("pokemon-id");
    newImg.classList.add("pokemon-img");
    newType.classList.add("pokemon-type");

    newName.textContent = `Ismi: ${fPok.name}`;
    newId.textContent = `Raqami: ${fPok.id}`;
    newImg.src = fPok.img;
    newType.textContent = `Sehrli kuchi: ${fPok.type}`;

    newDiv.append(newName, newId, newImg, newType);
    newLi.append(newDiv);
    elResult.append(newLi);
  }
});