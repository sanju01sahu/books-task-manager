const baseUrl = "https://server-demo-58ir.onrender.com";
const logoutBtn = document.getElementById("logoutBtn");
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?._id;

async function getTasks(status="") {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  let url = `${baseUrl}/task?userId=${userId}`;
  if (status) {
    url += `&status=${status}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    if (data.status) {
      renderTasks(data.tasks);
    } else {
      console.error(data.msg); // Display error message
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

function renderTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear previous tasks

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.id = `task-${task._id}`;
    taskItem.classList.add("singleTask");

    const description = document.createElement("p");
    description.textContent = task.description;

    const status = document.createElement("p");
    status.textContent = `Status: ${task.status}`;

    if (task.status === "todo") {
      status.style.color = "red";
    } else if (task.status === "in-progress") {
      status.style.color = "green";
    } else if (task.status === "done") {
      status.style.color = "blue";
    }

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("button-6");
    editBtn.addEventListener("click", () => editTask(task));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("button-5");
    deleteBtn.addEventListener("click", () => deleteTask(task._id));

    taskItem.appendChild(description);
    taskItem.appendChild(status);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
  });
}

function postTask(description) {
  fetch(`${baseUrl}/task/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ description }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        // console.log("Task added successfully");
        getTasks(); // Refresh tasks after adding a new one
      } else {
        console.error(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function putTask(taskId, newDescription, newStatus) {
  const token = localStorage.getItem("token");
  const updatedTask = { description: newDescription, status: newStatus };

  fetch(`${baseUrl}/task/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(updatedTask),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        // console.log("Task updated successfully");
        getTasks(); // Refresh tasks after editing
      } else {
        console.error(data.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function editTask(task) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.value = task.description;

  const statusInput = document.createElement("select");
  statusInput.innerHTML = `
        <option value="todo" ${
          task.status === "todo" ? "selected" : ""
        }>To-do</option>
        <option value="in-progress" ${
          task.status === "in-progress" ? "selected" : ""
        }>In Progress</option>
        <option value="done" ${
          task.status === "done" ? "selected" : ""
        }>Done</option>
    `;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.classList.add("button-6");
  saveBtn.addEventListener("click", () => {
    console.log();
    putTask(task._id, descriptionInput.value, statusInput.value);
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("button-5");
  cancelBtn.addEventListener("click", () => cancelEdit(taskItem));

  taskItem.appendChild(descriptionInput);
  taskItem.appendChild(statusInput);
  taskItem.appendChild(saveBtn);
  taskItem.appendChild(cancelBtn);

  // Replace the existing task element with the editable taskItem
  const existingTaskElement = document.getElementById(`task-${task._id}`);
  existingTaskElement.replaceWith(taskItem);
}

function deleteTask(taskId) {
  const token = localStorage.getItem("token");

  fetch(`${baseUrl}/task/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        // console.log("Task updated successfully");
        getTasks(); // Refresh tasks after editing
      } else {
        console.error(data.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function cancelEdit(taskItem) {
  // Reload the page to discard changes
  window.location.reload();
}

function logout() {
  // Clear local storage values
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Redirect to login page
  window.location.href = "./index.html";
}
