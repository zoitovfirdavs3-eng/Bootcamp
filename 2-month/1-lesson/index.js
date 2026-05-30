const elForm = document.querySelector(".js-form");
const elContactTemp = document.querySelector(".js-user-temp").content;
const elContactsLIst = document.querySelector(".js-user-list");

const storageContact = window.localStorage.getItem("contacts");
const contacts = storageContact ? JSON.parse(storageContact) : [];

const handleRenderContacts = (arr) => {
  elContactsLIst.innerHTML = "";
  const docFrag = new DocumentFragment();
  arr.forEach((contact) => {
    const cloneContactTemp = elContactTemp.cloneNode(true);
    cloneContactTemp.querySelector(".js-user-name").textContent =
      contact.firstname + " " + contact.lastname;
    cloneContactTemp.querySelector(".js-call-btn").href =
      `tel:${contact.phone_num}`;
    cloneContactTemp.querySelector(".js-contact-del-btn").dataset.id =
      contact.id;
    docFrag.append(cloneContactTemp);
  });
  elContactsLIst.append(docFrag);
};

const handleAddNewContact = (evt) => {
  evt.preventDefault();
  let value = evt.target.value;
  const newContact = {
    id: contacts.length ? contacts.at(-1).id + 1 : 1,
    firstname: username.value,
    lastname: lastname.value,
    phone_num: +usernumber.value,
  };
  contacts.push(newContact);
  window.localStorage.setItem("contacts", JSON.stringify(contacts));
  handleRenderContacts(contacts);
  username.value = "";
  lastname.value = "";
  usernumber.value = "";
};

const handleDeleteBtn = (evt) => {
  const elTarget = evt.target;
  if (elTarget.matches(".js-contact-del-btn")) {
    const id = Number(elTarget.dataset.id);
    const deleteContactIndex = contacts.findIndex(
      (contact) => contact.id === id,
    );
    contacts.splice(deleteContactIndex, 1);
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
    handleRenderContacts(contacts);
  }
};

elContactsLIst.addEventListener("click", handleDeleteBtn);

elForm.addEventListener("submit", handleAddNewContact);

handleRenderContacts(contacts);
