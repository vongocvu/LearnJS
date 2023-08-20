const showTodo = document.querySelector(".todo_list");
const input_todo = document.getElementById("input_todo");
const btn_addTodo = document.getElementById("btn_addTodo");

const ListTodo = [
  {
    name: "Đi học bài",
    status: false,
  },
];

function showData() {
  showTodo.innerHTML = "";
  ListTodo.forEach((todo) => {
    showTodo.innerHTML += `
      <div class="todo_item ${todo?.status ? "completed" : ""}">
      <div class="">${todo?.name}</div>
      <input class="check_todo" type="checkbox" ${
        todo?.status ? "checked" : ""
      } />
    </div>
    `;
  });

  const checks = document.querySelectorAll(".check_todo");
  check_todo(checks);
}

showData();

btn_addTodo.addEventListener("click", addTodo);

input_todo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  if (input_todo.value !== "") {
    ListTodo.unshift({
      name: input_todo.value,
      status: false,
    });
    input_todo.value = "";
    input_todo.focus();
    showData();
  }
}

function check_todo(checks) {
  checks.forEach((check, index) => {
    check.addEventListener("change", (e) => {
      ListTodo[index].status = !ListTodo[index].status;
      showData();
    });
  });
}
