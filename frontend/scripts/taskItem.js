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
    const deadline = document.getElementById('deadline').value;
    const currentDateTime = new Date().toISOString().slice(0, 16);
    if (deadline < currentDateTime) {
      alert('Deadline cannot be before the current time and date.');
      e.preventDefault(); // Prevent form submission
      return;
  }else{
    postTask(taskDescription)
  }
    // console.log(taskDescription)
});
filter.addEventListener("change", (e)=>{
  e.stopPropagation();
  filterTasks()
})

