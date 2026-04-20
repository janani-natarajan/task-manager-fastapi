const API = "http://127.0.0.1:8000";

// Register
async function register() {
  const res = await fetch(API + "/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: reg_user.value,
      password: reg_pass.value
    })
  });
  msg.innerText = await res.text();
}

// Login
async function login() {
  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: log_user.value,
      password: log_pass.value
    })
  });

  const data = await res.json();
  localStorage.setItem("token", data.access_token);
  window.location = "dashboard.html";
}

// Create Task
async function createTask() {
  await fetch(API + "/tasks", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: taskInput.value })
  });
  loadTasks();
}

// Load Tasks
async function loadTasks() {
  const res = await fetch(API + "/tasks", {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  const tasks = await res.json();
  taskList.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${t.title} - ${t.completed}
      <button onclick="completeTask(${t.id})">✔</button>
      <button onclick="deleteTask(${t.id})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

// Complete Task
async function completeTask(id) {
  await fetch(API + "/tasks/" + id, {
    method: "PUT",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed: true })
  });
  loadTasks();
}

// Delete Task
async function deleteTask(id) {
  await fetch(API + "/tasks/" + id, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });
  loadTasks();
}

// Auto load tasks
if (window.location.pathname.includes("dashboard")) {
  loadTasks();
}