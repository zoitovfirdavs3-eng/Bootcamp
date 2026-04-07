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

      elResult.textContent = `❌ Xato! Qolgan urinishlar: ${5 - checkNumber}`;

      // effektlar
      elForm.classList.add("shake");
      elInp.classList.add("error");
      elResult.classList.add("error-text");

      // 300ms dan keyin olib tashlaymiz
      setTimeout(() => {
        elForm.classList.remove("shake");
        elInp.classList.remove("error");
        elResult.classList.remove("error-text");
      }, 300);

      return;
    } else if (inpNum == randomNumber) {
      elResult.textContent = "🎉 Tabriklayman! Siz yutdingiz!";

      let duration = 2000;
      let end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
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
