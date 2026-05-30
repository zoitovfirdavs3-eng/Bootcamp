const elForm = document.querySelector(".js-user-form");
const elUserNameInp = document.querySelector(".js-username-inp");
const elPhoneNumInp = document.querySelector(".js-tel-inp");
const elUserTemp = document.querySelector(".js-user-temp").content;
const elUserList = document.querySelector(".js-user-list");
const elFoodForm = document.querySelector(".js-food-form");
const elFoodSelect = elFoodForm.querySelector(".js-food-select");
const elFoodCountInp = elFoodForm.querySelector(".js-food-count");
const elOrderList = document.querySelector(".js-order-list")

/* ---------------------    USERLAR UCHUN    --------------------- */
let clientId = window.localStorage.getItem("clientId");
/* ---------------------    USERLAR UCHUN    --------------------- */

/* ---------------------    USERLAR UCHUN    --------------------- */
const userStorage = window.localStorage.getItem("users");
const users = userStorage ? JSON.parse(userStorage) : [];
/* ---------------------    USERLAR UCHUN    --------------------- */

/* ---------------------    USERLAR UCHUN    --------------------- */
const orderStorage = window.localStorage.getItem("orders");
const orders = orderStorage ? JSON.parse(orderStorage) : [];
/* ---------------------    USERLAR UCHUN    --------------------- */

// USERS ----------------------------->>>>>>>>
const handleRenderUsers = (arr) => {
  elUserList.innerHTML = "";
  const docFrag = new DocumentFragment();
  arr.forEach((user) => {
    const cloneUserTemp = elUserTemp.cloneNode(true);
    cloneUserTemp.querySelector(".customer-name").textContent = user.username;
    cloneUserTemp.querySelector(".customer-name").dataset.id = user.id;
    docFrag.append(cloneUserTemp);
  });
  elUserList.append(docFrag);
};

handleRenderUsers(users);

const handleRenderOrder = (clientId) => {
  if(!clientId) return;

  let userOrders = orders.filter(order => +order.clientId == +clientId);

  userOrders = userOrders.map(userOrder => {
    const product = products.find(product => product.id == userOrder.productId);
    return {
      ...userOrder,
      product
    };
  });
  
  userOrders.forEach(order => {
    elorderlist
  })

  // arr.forEach((order) => {
  //   const cloneUserTemp = elUserTemp.cloneNode(true);
  //   cloneUserTemp.querySelector(".customer-name").textContent = user.username;
  //   cloneUserTemp.querySelector(".customer-name").dataset.id = user.id;
  //   docFrag.append(cloneUserTemp);
  // });
};

const handleAddUser = (evt) => {
  evt.preventDefault();
  const username = elUserNameInp.value;
  const phoneNum = elPhoneNumInp.value;

  if (!username) return alert("Username is required !");
  if (!phoneNum) return alert("Phone number is required !");

  const newUser = {
    id: users.length ? users.at(-1).id + 1 : 1,
    username,
    phoneNum,
  };
  users.push(newUser);
  window.localStorage.setItem("users", JSON.stringify(users));
  handleRenderUsers(users);
};

elForm.addEventListener("submit", handleAddUser);

const handleSelectUserRenderText = (clientId) => {
  if (clientId) {
    const findUser = users.find((user) => user.id === +clientId);
    userClientId.textContent = clientId;
    userHeader.textContent = findUser.username;
  }
};

handleSelectUserRenderText(clientId);

const hanldeSelectUserClick = (evt) => {
  const elTarget = evt.target;
  if (elTarget.matches(".customer-name")) {
    const selectClientId = elTarget.dataset.id;
    window.localStorage.setItem("clientId", selectClientId);
    clientId = selectClientId;
    handleRenderOrder(clientId);
    handleSelectUserRenderText(selectClientId);
  }
};

elUserList.addEventListener("click", hanldeSelectUserClick);

// FOODS ----------------------------->>>>>>>>
const handleRenderFoodSelect = (arr) => {
  arr.forEach((product) => {
    const newProductOption = document.createElement("option");
    newProductOption.textContent = product.product_name;
    newProductOption.value = product.id;
    elFoodSelect.append(newProductOption);
  });
};

handleRenderFoodSelect(products);

// ORDERS ----------------------------->>>>>>>>
const handleAddOrder = (evt) => {
  evt.preventDefault();

  const productId = elFoodSelect.value;
  const count = elFoodCountInp.value;
  if (!productId) return alert("Product is required !");
  if (!count) return alert("Count is required !");
  if (count <= 0) return alert("Invalid count !!!!!!!");

  if (!clientId) return alert("Please select client");

  const newOrder = {
    id: orders.length ? orders.at(-1).id + 1 : 1,
    productId,
    count,
    clientId,
  };
  orders.push(newOrder);
  window.localStorage.setItem("orders", JSON.stringify(orders));

  handleRenderOrder(clientId);
};

elFoodForm.addEventListener("submit", handleAddOrder);

handleRenderOrder(clientId);