const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-form__input');
const todosList = document.querySelector('.todo-list');
const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
})

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const item = document.createElement('li');

    if (todo && todo.completed) {
      item.classList.add('completed');
    }

    item.innerText = todoText;
    item.classList.add('todo-list__item');

    item.addEventListener('click', () => {
      item.classList.toggle('completed');
      updateLS();
    })

    item.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      item.remove();
      updateLS();
    })

    todosList.appendChild(item);
    input.value = '';
    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll('.todo-list__item');
  const todos = [];

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed')
    })
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}