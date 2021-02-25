const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-form__input');
const todosUL = document.querySelector('.todo-list');
const todos = JSON.parse(localStorage.getItem('todos'));

const sortRadio = document.querySelectorAll('.sort-item__radio');
const sortLabel = document.querySelectorAll('.sort-item__label')

sortLabel.forEach(label => {
  label.addEventListener('click', () => {
    var filter = label.getAttribute('for');
    sortRadio.forEach(radio => {
      radio.checked = false;
      radio.nextElementSibling.classList.remove('selected');
    })
    label.control.checked = true;
    label.classList.toggle('selected');
    console.log(label.classList);
    sortBy(filter);
  })
})

function sortBy(filter) {
  todosUL.querySelectorAll('.todo-list__item').forEach(element => {
    element.style.display = 'inherit';
    console.log(element);

  })
  switch (filter) {
    case 'all':
      console.log('all list');
      todosUL.querySelectorAll('.todo-list__item').forEach(element => {
        if (element.classList.contains('completed')) {
          element.style.display = 'inherit';
          console.log(element);
        }
      })
      break;
    case 'active':
      console.log('active list');
      todosUL.querySelectorAll('.todo-list__item').forEach(element => {
        if (element.classList.contains('completed')) {
          element.style.display = 'none';
          console.log(element);
        }
      })
      break;
    case 'done':
      console.log('done list');
      todosUL.querySelectorAll('.todo-list__item').forEach(element => {
        if (!element.classList.contains('completed')) {
          element.style.display = 'none';

          console.log(element);
        }
      })
      break;
    default:
      break;
  }
}

console.log(todos);



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
    })
    if (document.querySelector('[name="done"]').checked) {
      item.classList.toggle('completed');
    }

    item.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      item.remove();
      updateLS();
    })

    todosUL.appendChild(item);
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