const API_URL = "http://localhost:3000/api"; // Signup
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) window.location.href = "login.html";
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } else {
        alert(data.message);
    }
});

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// Add To-Do
document.getElementById("todoForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const task = document.getElementById("todoInput").value;
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/todo/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ task })
    });

    if (res.ok) {
        document.getElementById("todoInput").value = "";
        fetchTodos();
    } else {
        alert("Failed to add To-Do");
    }
});

// Fetch To-Dos
async function fetchTodos() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/todo/all`, {
        headers: { Authorization: token }
    });

    const todos = await res.json();
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${todo.task}
            <button onclick="deleteTodo('${todo._id}')">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Delete To-Do
async function deleteTodo(id) {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/todo/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: token }
    });

    fetchTodos();
}

// Load To-Dos on Dashboard
if (window.location.pathname.includes("dashboard.html")) {
    fetchTodos();
}
