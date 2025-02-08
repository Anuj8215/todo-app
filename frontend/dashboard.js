const API_URL = "http://localhost:5001/api/todo";
const token = localStorage.getItem("token");

if (!token) {
  alert("Not authorized. Please log in.");
  window.location.href = "login.html";
}

async function fetchTodos() {
  const response = await fetch(`${API_URL}/all`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const todos = await response.json();

  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTodo(todo._id);

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

async function addTodo() {
  const text = document.getElementById("todoInput").value;
  if (!text) return alert("Please enter a todo.");

  await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  document.getElementById("todoInput").value = "";
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  fetchTodos();
}

fetchTodos();
