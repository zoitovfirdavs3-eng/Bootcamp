const elFrom = document.querySelector(".js-form");
const elInp = elFrom.querySelector(".js-inp");
const elResult = document.querySelector(".js-pokemons-list");

pokemons = pokemons.slice(0, 10);

const renderFn = (arr) => {
  for (let pokemon of arr) {
    let newLi = document.createElement("li");
    let newName = document.createElement("h2");
    let newId = document.createElement("span");
    let newImg = document.createElement("img");
    let newType = document.createElement("p");

    newName.textContent = `Ismi: ${pokemon.name}`;
    newId.textContent = `Raqami: ${pokemon.id}`;
    newImg.src = pokemon.img;
    newType.textContent = `Sehrli kuchi: ${pokemon.type}`;

    newLi.append(newName, newId, newImg, newType);
    elResult.append(newLi);
  }
};

renderFn(pokemons);

elFrom.addEventListener("submit", (evt) => {
  evt.preventDefault();
  elResult.innerHTML = "";
  let val = elInp.value.trim();
  if(!val) return renderFn(pokemons);
  let searchRegex = new RegExp(val, "gi");
  let filterPokemons = pokemons.filter(function (pokemon) {
    return pokemon.name.match(searchRegex);
  });
  for(let fPok of filterPokemons){
    let newLi = document.createElement("li");
    let newName = document.createElement("h2");
    let newId = document.createElement("span");
    let newImg = document.createElement("img");
    let newType = document.createElement("p");

    newName.textContent = fPok.name;
    newId.textContent = fPok.id;
    newImg.src = fPok.img;
    newType.textContent = fPok.type;

    newLi.classList.add("w-25", "border", "bg-secondary", "text-center", "d-flex", "flex-column");

    newLi.append(newName, newId, newImg, newType);
    elResult.append(newLi);
  }
});
