const elTemp = document.querySelector(".js-temp");
const elForm = document.querySelector(".js-form");
const elCallBtn = elTemp.querySelector(".js-call-btn");
const elLi = elTemp.querySelector(".js-li");
const elContactsLIst = document.querySelector(".js-contact-list");
const elNameInp = elForm.querySelector(".js-first-name-inp");
const elLastNameInp = elForm.querySelector(".js-last-name-inp");
const elNumberInp = elForm.querySelector(".js-number-inp");


const handleRenderFn = function(evt) {
    evt.preventDefault();
    let firstName = elNameInp.value;
    let lastName = elLastNameInp.value;
    let phoneNumber = elNumberInp.value;
    if(!firstName || !phoneNumber) return alert("Qiynat kiriting")
    const cloneTemp = elTemp.content.cloneNode(true);
    cloneTemp.querySelector("h3").textContent = firstName;
    cloneTemp.querySelector("h4").textContent = lastName;
    cloneTemp.querySelector("p").textContent = phoneNumber;
    elContactsLIst.append(cloneTemp);
    elForm.reset();
};

elForm.addEventListener("submit", handleRenderFn);