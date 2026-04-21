// const elTemp = document.querySelector(".js-temp");
// const elForm = document.querySelector(".js-form");
// const elInp = elForm.querySelector(".js-inp");

// // Lists
// const elFizzBuzzList = document.querySelector(".js-fizzBuzz-list");
// const elBuzzList = document.querySelector(".js-buzz-list");
// const elFizzList = document.querySelector(".js-fizz-list");

// Decloration function
// function handleRenderNums(num, parent) {
//   const cloneTemp = elTemp.content.cloneNode(true);
//   cloneTemp.querySelector("p").textContent = num;
//   parent.append(cloneTemp);
// }

// function handleSub(evt) {
//   evt.preventDefault();
//   const val = Number(elInp.value);
//   if (!val) return alert("Qiymatni kiriting!");
//   for (let i = 1; i <= val; i++) {
//     if (i % 15 == 0) handleRenderNums(i, elFizzBuzzList);
//     else if (i % 3 == 0) handleRenderNums(i, elFizzList);
//     else if (i % 5 == 0) handleRenderNums(i, elBuzzList);
//   }
// }

// Expression function
// const handleRenderNums = function (num, parent) {
//   const cloneTemp = elTemp.content.cloneNode(true);
//   cloneTemp.querySelector("p").textContent = num;
//   parent.append(cloneTemp);
// };

// const handleSub = function(evt) {
//     evt.preventDefault();
//     const val = Number(elInp.value);
//     if(!val) alert("Qiymatni kiriting!");
//     for(let i = 1; i <= val; i++){
//         if (i % 15 == 0) handleRenderNums(i, elFizzBuzzList);
//         else if (i % 3 == 0) handleRenderNums(i, elFizzList);
//         else if (i % 5 == 0) handleRenderNums(i, elBuzzList);
//     }
// }

// elForm.addEventListener("submit", handleSub);

