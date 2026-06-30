// const elTodoList = document.querySelector(".js-todo-list");
// const elTodoTemp = document.querySelector(".js-todo-temp").content;
// const elAllTodoBtn = document.querySelector(".js-all-todo-btn");
// const elCompleteTodoBtn = document.querySelector(".js-complete-todo-btn");
// const elUncompleteTodoBtn = document.querySelector(".js-uncomplete-todo-btn");

// const BASE_URL = "https://jsonplaceholder.typicode.com";

// async function getTodos(url, completed) {
//   if (completed != undefined) completed = `completed=${completed}`;
//   else completed = "";
//   const req = await fetch(url + `/todos?${completed}`);
//   if (req.ok) {
//     const res = await req.json();
//     renderTodos(res);
//   }
// }

// getTodos(BASE_URL);

// function renderTodos(todos) {
//   elTodoList.innerHTML = "";
//   const docFragment = document.createDocumentFragment();
//   for (let todo of todos) {
//     const cloneTodoTemp = elTodoTemp.cloneNode(true);
//     cloneTodoTemp.querySelector(".js-todo-title").textContent = todo.title;
//     docFragment.append(cloneTodoTemp);
//   }
//   elTodoList.append(docFragment);
// }

// elCompleteTodoBtn.addEventListener("click", async () => {
//   const req = await fetch(BASE_URL + "/todos?completed=true");
//   if (req.ok) {
//     const res = await req.json();
//     renderTodos(res);
//   }
// });

// elAllTodoBtn.addEventListener("click", () => getTodos(BASE_URL));
// elCompleteTodoBtn.addEventListener("click", async () =>
//   getTodos(BASE_URL, true),
// );
// elUncompleteTodoBtn.addEventListener("click", async () =>
//   getTodos(BASE_URL, false),
// );
const user = {
  email: false
}
// try {
  if(!user.email) throw("email is required")
// } catch (err) {
//   console.log(err)
// }
console.log(1)