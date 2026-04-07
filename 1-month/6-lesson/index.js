const elForm = document.querySelector(".js-form");
const elInp = elForm.querySelector(".js-inp");
const elResult = document.querySelector(".js-result");
const elCarList = document.querySelector(".js-car-list");

const cars = [
  "Jentra",
  "Malibu",
  "Zeeker",
  "BYD",
  "Nexia",
  "Cobalt",
  "Lacetti",
  "Damas",
  "Spark",
  "Tracker",
  "Trailblazer",
  "Captiva",
  "Tahoe",
  "Equinox",
  "Onix",
  "Kia K5",
  "Kia Sportage",
  "Hyundai Elantra",
  "Hyundai Tucson",
  "Toyota Corolla",
  "Toyota Camry",
  "Toyota Prado",
  "Toyota Land Cruiser",
  "Honda Civic",
  "Honda Accord",
  "BMW X5",
  "BMW X7",
  "Mercedes-Benz C-Class",
  "Mercedes-Benz E-Class",
  "Audi A6",
  "Audi Q7",
  "Tesla Model 3",
  "Tesla Model X",
  "Nissan Altima",
  "Nissan Rogue",
  "Ford Focus",
  "Ford Mustang",
];

for (let i = 0; i < cars.length; i++) {
  elCarList.innerHTML += `<li>${cars[i]}</li>`;
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  elCarList.innerHTML = "";
  if (!elInp.value) {
    for (let i = 0; i < cars.length; i++) {
      elCarList.innerHTML += `<li>${cars[i]}</li>`;
    }
  }
  if (cars.includes(elInp.value)) {
    elCarList.innerHTML = `<li>${elInp.value}</li>`;
  }
});
