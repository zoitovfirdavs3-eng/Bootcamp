const elForm = document.querySelector(".js-form");
const elInp = elForm.querySelector(".js-inp");
const elBtn = elForm.querySelector(".js-btn");
const elRestartBtn = document.querySelector(".js-restart-btn");
const elResult = document.querySelector(".js-result");
const elAnswerBtn = document.querySelector(".js-answer-btn");
const elAnswerOut = document.querySelector(".answer");
const randomNumber = Math.round(Math.random() * 20);
console.log(randomNumber);

let checkNumber = 0;

// Raqamni aniqlash
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inpNum = Number(elInp.value);
  if (!inpNum) return alert("Qiymat kiritmadingiz");
  if (checkNumber < 5) {
    if (inpNum != randomNumber) {
      checkNumber++;
      return (elResult.textContent = `Afsuski hato urinish boldi. Sizda qolgan urinishlar soni ${5 - checkNumber}`);
    } else if (inpNum == randomNumber) {
      elResult.textContent = "Tabriklayman siz tog'ri qiymat kiritdingiz endi restart tugmasini bosing";
    }
  } else {
    elResult.textContent = `Sizda urinishlar qolmadi endi yangi qiymatni topishga harakat qiling
Undan avval restart tugmasini bosing`;
  }
});

// Restart
elRestartBtn.addEventListener("click", () => {
  window.location.reload();
});

// Javobni ko'rish
elAnswerBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  elAnswerOut.textContent = `Men o'ylagan son ${randomNumber}`;
});