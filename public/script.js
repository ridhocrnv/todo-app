const apiUrl = 'http://localhost:3000/api';
let token = localStorage.getItem('token');

function showLogin() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

function showTodoList() {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('todo-container').style.display = 'block';
  loadTodos();
}

function hideTodoList() {
  document.getElementById('todo-container').style.display = 'none';
  document.getElementById('auth-container').style.display = 'block';
}

async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();

  if (response.ok) {
    token = data.token;
    localStorage.setItem('token', token);
    showTodoList();
  } else {
    alert(data.message);
  }
}

async function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();

  if (response.ok) {
    alert('Registration successful, please login');
    showLogin();
  } else {
    alert(data.message);
  }
}

async function logout() {
  localStorage.removeItem('token');
  token = null;
  hideTodoList();
  showLogin();
}

async function loadTodos() {
  const response = await fetch(`${apiUrl}/todos`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const todos = await response.json();
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTodo(todo._id);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

async function addTodo() {
  const text = document.getElementById('todo-text').value;

  const response = await fetch(`${apiUrl}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });

  if (response.ok) {
    loadTodos();
    document.getElementById('todo-text').value = '';
  } else {
    alert('Failed to add todo');
  }
}

async function deleteTodo(id) {
  const response = await fetch(`${apiUrl}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    loadTodos();
  } else {
    alert('Failed to delete todo');
  }
}

if (token) {
  showTodoList();
} else {
  showLogin();
}
