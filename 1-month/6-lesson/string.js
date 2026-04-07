const elForm = document.querySelector(".js-form");
const elInp = elForm.querySelector(".js-inp");
const elResult = document.querySelector(".js-result");

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const val = elInp.value.trim();
    if(!val){
        elResult.textContent = '';
        return alert('Qiymatni kiriting');
    }
    const firstVal = val.at(0);
    if(firstVal.toLowerCase() == firstVal){
        elResult.textContent = 'Bosh harfi kichik'
    }else if(firstVal.toUpperCase() == firstVal){
        elResult.textContent = 'Bosh harfi katta'
    }
})