// ! Har bir masalaga 10 daqiqadan vaqt sarflang oshib ketmasin...

// Masala - 1 ✅

// Arraydagi eng katta sonni topish kerak for loop bilan

// const numbers = [23, 45, 67, 89, 34, 56, 33, 151, 78, 20];

// const biggestNumFn = function(arr) {
//     // eng kattasini topish uchun birinchi qiymtaini olim, qolganlari bilan solishtirish uchun
//     let biggestNum = arr[0];
//     // for orqali arrayni aylanib chiqdim
//     for(let i = 0; i <= arr.length-1; i++){
//         // va hamma sonni birinchi qiymat bilan solishtirdim
//         if(arr[i] >= biggestNum) {
//             // agar boshqa qiymat birinchisidan katta bolsa biggestNum ning qiymatini oshanga tenglashtirdim
//             biggestNum = arr[i]
//         };
//     };
//     // va natijani return qildim
//     return biggestNum;
// };

// const result = biggestNumFn(numbers);
// console.log(result);

// Masala - 2 ✅

// Arraydagi eng uzun so'zni topib uning oxirgisidan bitta oldingi harfini topish

// const fruites = ["Olma", "Nok", "Anor", "Chegara"];

// function longestWordFn(fruit) {
//     // Bosh string ochdim eng uzun so'zni olish uchun
//     let str = '';
//     // for orqali eng uzun so'zni topib str o'zgaruvchisiga tengladim
//     for(let i = 0; i <= fruit.length-1; i++){
//         if(fruit[0].length > fruit[i]){
//             str = fruit[0]
//         }else str = fruit[i]
//     };
//     // return da topilgan eng uzun so'zning oxiridan butta oldingi harfini qaytardim
//     return str.at(-2)
// }

// // va console da natijani ko'rdim
// const result = longestWordFn(fruites);
// console.log(result);

// Masala - 3 ✅

// Arraydagi barcha stringning lengthini topish

// const fruites = ["Olma", "anor", "Nok"];

// const allLengthFn = function (arr){
//     let allLen = 0;
//     for(let str of arr){
//         allLen += str.length
//     };
//     return allLen;
// };

// const result = allLengthFn(fruites);
// console.log(result);

// Masala - 4 ✅

// Arrayda kamida 6 ta toq va juft son bor, va shundan juft sonlarning yarmini ya'ni 18 juft soni bo'lsa uning yarmi 9 sonini bir arrayga solib qaytarib bersin ya'ni hamma juftlarning yarmini bitta arrayga joylash kerak

// const numbers = [23, 58, 96, 31, 74, 44, 152, 531, 26];

// function coupleFn(nums){
//     // Bu yerda hamma juft sonlarning yarmini solish uchun array yaratdim, lekin savol tug'iladi: nega let emas const o'zgarmasku degan chunki const da array elon qilganman va men bu arrayga qiymat push qilaman lekin array orniga object yoki number qo'ymaganim sababli xatolik bo'lmaydi
//     const arr = [];

//     // for of orqali barcha numberlarni aylanib chiqdim
//     for(let num of nums){
//         // if orqali ularning juft yoki toq ekanini aniqladim
//         if(num % 2 == 0){
//             // va juftlarini 2 ga bo'lib arr ga push qildim
//             arr.push(num/2)
//         };
//     };
//     // va oxirida natijani return qildim
//     return arr;
// };

// const result = coupleFn(numbers);
// console.log(result)

// [29, 48, 37]

// Masala - 5 ✅

// Arraydagi katta harf bilan boshlangan so'zlarning birinchi harfini kichik qolgan harfini katta qilib, kichik harf bilan boshlanganlarini birinchi harfini katta qolganlarini kichkina qib bersin

// const fruites = ["olma", "o'rik", "Nok", "avacado"];

// function stringFn(arr) {
//   const sumArr = [];
//   for (let fruit of arr) {
//     if (fruit[0].toLowerCase() === fruit[0]) {
//         sumArr.push(fruit[0].toUpperCase() + fruit.slice(1, fruit.length).toLowerCase())
//     }else if(fruit[0].toUpperCase() === fruit[0]){
//         sumArr.push(fruit[0].toLowerCase() + fruit.slice(1, fruit.length).toUpperCase())
//     }
//   }
//   return sumArr;
// }

// const result = stringFn(fruites);
// console.log(result);

// Masala - 6 ✅

// Promptdan bir so'z kiritish kerak va shu so'zni 3 marta space bilan chiqarib berish kerak for loop da

// example: olma => olma olma olma

// // Prompt orqali so'z oldim
// const inpWord = prompt("So'z kiriting");

// const tripleWordFn = function (word){
//     // User kiritgan so'zni 3 marta chiqarish uchun hammasini shu o'zgaruvchiga yig'dim
//     let str = '';
//     // for loop orqali 3 marta aylanib oldim
//     for(let i = 1; i <= 3; i++){
//         // concat (immutable) asl qiymatni ozgartirmaganligi sababli str ning o'ziga qo'shilgan qiymatlarni tengladim
//         str = str.concat(" ", inpWord)
//     };
//     // va natijani return qildim
//     return str;
// };

// const result = tripleWordFn(inpWord);
// console.log(result);

// Masala - 7 ✅

// Ichma ich array bor va shu arrayning juft arraylarning birinchi elementining birinchi harflarini birlashtirib qaytarib bersin

// example: const fruitesArray = [["Olma"],["Bexi"],["Anor"],["Xurmo"],["GIlos"],["Kiwi"],["Banan"],];  => BXK

// const fruitesArray = [
//   ["Olma"],
//   ["Bexi"],
//   ["Anor"],
//   ["Xurmo"],
//   ["GIlos"],
//   ["Kiwi"],
//   ["Banan"],
// ];

// function firstElFn(arr) {
//   // hamma juft arraylarning bosh harflarini shu o'zgaruvchiga yig'dim
//   let str = "";
//   // for orqali juft arraylarni aniqlab ularning bosh harflarini result o'zgaruvchisiga saqladim
//   for (let i = 0; i <= arr.length - 1; i++) {
//     if (i % 2 == 1) {
//       str += arr[i][0][0];
//     }
//   }
//   // va natijani return qildim
//   return str;
// }

// const result = firstElFn(fruitesArray);
// console.log(result)
