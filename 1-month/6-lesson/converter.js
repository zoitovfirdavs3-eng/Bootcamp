const elForm = document.querySelector(".js-form");
const elInp = elForm.querySelector(".js-inp");
const elSelect = elForm.querySelector(".js-currency-select");
const elResult = document.querySelector(".js-result");

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const val = Number(elInp.value);
    if(!val){
        elResult.textContent = '';
        return alert('Qiymatni kiriting');
    }
    const currency = Number(elSelect.value);
    if(!val) return alert("Qiymat kiriting");
    if(!currency) return alert("Valyutani tanlang");
    elResult.textContent = `${val * currency} so'm`
})