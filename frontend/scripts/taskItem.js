const filter = document.getElementById('filter');
const addItemForm = document.getElementById("addItem");

function filterTasks() {
  const status = document.getElementById("filter").value;
  getTasks(status);
}

window.addEventListener("load", () => {
  if (!token && !user) {
    window.location.href = "./index.html";
    return;
  }
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  getTasks();
});


addItemForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const taskDescription = document.getElementById("taskDescription").value;
    // console.log(taskDescription)
    postTask(taskDescription)
});
filter.addEventListener("change", (e)=>{
  e.stopPropagation();
  filterTasks()
})

