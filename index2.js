let dataTodo = [];

const showTodo = document.querySelector(".todo_list");

function showDataTodo() {
  dataTodo = [];
  const getTodoOnLocalStorage = localStorage.getItem("todolist");

  JSON.parse(getTodoOnLocalStorage)?.forEach((data) => {
    dataTodo.push(data);
  });

  showTodo.innerHTML = "";
  if (dataTodo[0] !== null) {
    dataTodo.forEach((todo) => {
      showTodo.innerHTML += `
              <div class="todo_item ${todo?.status ? "completed" : ""}">
                  <div class="">${todo?.name}</div>
                  <div>
                  <input class="check_todo" type="checkbox" ${
                    todo?.status ? "checked" : ""
                  } />
                  <button class="delete_todo">Xóa</buton>
                  </div>
            </div>
            
              `;
    });
  }
  const check_todos = document.querySelectorAll(".check_todo");
  const delete_todos = document.querySelectorAll(".delete_todo");
  checks(check_todos);
  deleteTodo(delete_todos);
}

showDataTodo();

const inputTodo = document.getElementById("input_todo");
const btn_addTodo = document.getElementById("btn_addTodo");

btn_addTodo.addEventListener("click", addTodo);

inputTodo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  if (inputTodo.value !== "") {
    dataTodo.unshift({
      name: inputTodo.value,
      status: false,
    });
    inputTodo.value = "";
    inputTodo.focus();
    localStorage.setItem("todolist", JSON.stringify(dataTodo));
    showDataTodo();
  }
}

function checks(checks) {
  checks.forEach((check, index) => {
    check.addEventListener("change", () => {
      dataTodo[index].status = !dataTodo[index].status;
      localStorage.setItem("todolist", JSON.stringify(dataTodo));
      showDataTodo();
    });
  });
}

function deleteTodo(checks) {
  checks.forEach((check, index) => {
    check.addEventListener("click", () => {
      dataTodo.splice(index, 1);
      localStorage.setItem("todolist", JSON.stringify(dataTodo));
      showDataTodo();
    });
  });
}
