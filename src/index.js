document.addEventListener("DOMContentLoaded", () => {
  // your code here
  let form = document.querySelector('form');
  form.setAttribute('style', 'text-align:center');
  let user = document.createElement('input');
  user.setAttribute('type', 'text');
  user.setAttribute('id', 'new-task-user');
  user.setAttribute('placeholder', 'user name');
  form.appendChild(user);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let task = document.getElementById('new-task-description');
    createToDo(task.value, user.value);
    form.reset();
  })
});

function createToDo(todo, user) {
  let li = document.createElement('li');
  let task = document.createElement('span');
  let userName = document.createElement('span');
  let spacer = document.createElement('span');
  let btn = document.createElement('button');
  let menu = buildPrioritiesMenu();
  let edit = document.createElement('button');
  btn.addEventListener('click', handleDelete);
  btn.textContent = '  X  ';
  btn.setAttribute('class', 'delete');
  task.textContent = `${todo}`;
  task.setAttribute('class', 'todos');
  userName.textContent = `${user}`;
  userName.setAttribute('class', 'users');
  edit.textContent = ' EDIT ';
  edit.setAttribute('class', 'editButton');
  spacer.textContent = '  -  ';
  li.appendChild(task);
  li.appendChild(spacer);
  li.appendChild(userName);
  li.appendChild(menu);
  li.appendChild(edit);
  li.appendChild(btn);
  edit.addEventListener('click', handleEdit);
  document.querySelector('#tasks').appendChild(li);
}

function handleEdit(e) {
  let entry = e.target.parentNode;
  let task = entry.querySelector('.todos');
  let user = entry.querySelector('.users');
  let edit = entry.querySelector('.editButton');
  let update = document.createElement('button');
  update.textContent = 'SAVE CHANGES';
  update.addEventListener('click', handleEditSave);
  let taskEntry = document.createElement('input');
  taskEntry.setAttribute('value', task.textContent);
  taskEntry.setAttribute('class', 'todos');
  let userEntry = document.createElement('input');
  userEntry.setAttribute('value', user.textContent);
  userEntry.setAttribute('class', 'users');
  entry.insertBefore(taskEntry, task);
  task.remove();
  entry.insertBefore(userEntry, user);
  user.remove();
  entry.insertBefore(update, edit);
  edit.remove();
}

function handleEditSave(e) {
  let entry = e.target.parentNode;
  console.log(entry);
  let taskEntry = entry.querySelector('.todos');
  let userEntry = entry.querySelector('.users');
  let task = document.createElement('span');
  let user = document.createElement('span');
  task.setAttribute('class', 'todos');
  user.setAttribute('class', 'users');
  task.textContent = taskEntry.value;
  user.textContent = userEntry.value;
  entry.insertBefore(task, taskEntry);
  entry.insertBefore(user, userEntry);
  taskEntry.remove();
  userEntry.remove();
}

function handleDelete(e) {
  e.target.parentNode.remove();
}

function handlePriorities(e) {
  if (e.target.value === 'high') {
    e.target.parentNode.style = 'color: red';
    e.target.parentNode.class = 'highP';
  } else if (e.target.value === 'med') {
    e.target.parentNode.style = 'color: yellow';
    e.target.parentNode.class = 'medP';
  } else if (e.target.value === 'low') {
    e.target.parentNode.style = 'color: green';
    e.target.parentNode.class = 'lowP';
  }
  organizeToDos(e.target.parentNode);
}

function organizeToDos(item) {
  let tasks = document.getElementById('tasks');
  if (item !== undefined) {
    if (item.class === 'highP') {
      tasks.prepend(item);
    } else if (item.class === 'lowP') {
      tasks.appendChild(item);
    } else if (item.class === 'medP') {
      if (item.previousSibling === null) {
        tasks.insertBefore(item.nextSibling, item);
        console.log(item.previousSibling);
      } else if (item.nextSibling === null) {
        tasks.insertBefore(item, item.previousSibling);
      }
      while (item.previousSibling.class === 'lowP' || item.nextSibling.class === 'highP') {
        if (item.previousSibling.class === 'lowP') {
          tasks.insertBefore(item, item.previousSibling);
          } else if (item.nextSibling.class === 'highP') {
          tasks.insertBefore(item.previousSibling, item);
        }
      }
    }
  }
}

function buildPrioritiesMenu() {
  let menu = document.createElement('select');
  menu.name = 'Priorities';
  let option0 = document.createElement('option');
  let option1 = document.createElement('option');
  let option2 = document.createElement('option');
  let option3 = document.createElement('option');
  option0.value = 'default';
  option1.value = 'high';
  option2.value = 'med';
  option3.value = 'low';
  option0.textContent = 'Select Priority';
  option1.textContent = 'High Priority';
  option2.textContent = 'Medium Priority';
  option3.textContent = 'Low Priority';
  menu.appendChild(option0);
  menu.appendChild(option1);
  menu.appendChild(option2);
  menu.appendChild(option3);
  menu.addEventListener('change', handlePriorities);
  return menu;
}
