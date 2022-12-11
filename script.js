const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
};

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

let toDos = [];

function newTodo() {
  toDoCounter.increment();
  const counter = toDoCounter.get();

  const newToDo = {
    id: counter,
    title: `new ToDo with id #${counter}`,
    checked: false,
  };
  toDos.push(newToDo);
  refreshToDoList();
}

const toDoCounter = (function toDoCounter() {
  let counter = 0;
  return { increment: () => counter++, get: () => counter };
})();

function refreshToDoList() {
  list.innerHTML = toDos.map(createItemMarkup).join("");
  itemCountSpan.innerText = list.childElementCount;
  uncheckedCountSpan.innerText = toDos.filter(
    (item) => item.checked === false
  ).length;
}

function toggleStatus(id) {
  const index = toDos.findIndex((item) => item.id === id);
  toDos[index].checked = !toDos[index].checked;
  refreshToDoList();
}

function deleteToDo(id) {
  const filteredToDos = toDos.filter((item) => item.id !== id);
  toDos = [...filteredToDos];
  refreshToDoList();
}

function createItemMarkup(toDo) {
  return `<div class=${classNames.TODO_ITEM}>
  <p class=${classNames.TODO_TEXT}>${toDo.title}</p>
  <div class='todo-settings'>
  <input type="checkbox" ${toDo.checked ? "checked" : ""} class=${
    classNames.TODO_CHECKBOX
  } onClick="toggleStatus(${toDo.id})"/>
  <button type="button" class=${classNames.TODO_DELETE} onClick="deleteToDo(${
    toDo.id
  })">Delete</button>
  </div>
  </div>`;
}
