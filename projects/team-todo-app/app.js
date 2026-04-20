const taskInput = document.querySelector('#task-input');
const dueInput = document.querySelector('#due-input');
const addBtn = document.querySelector('#add-btn');
const taskList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');
const clearDoneBtn = document.querySelector('#clear-done-btn');

//Uppgift 1: Lägg till uppgift

const handleAddTask = () => {
  const taskText = taskInput.value.trim();
  const dueDate = dueInput.value;

  if (taskText.length === 0) return;

  const id = Date.now().toString();

  const li = createTaskHtml(taskText, dueDate, id);
  taskList.appendChild(li);

  addToStorage({ id, text: taskText, due: dueDate, done: false }, 'tasks');
  document.querySelector('.filter-btn.active')?.click();

  updateTaskCount();
  updateEmptyState();

  taskInput.value = '';
  dueInput.value = '';
  taskInput.focus();
};

addBtn.addEventListener('click', handleAddTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleAddTask();
});

//Uppgift 2: Ta bort uppgift

const handleDeleteTask = (e) => {
  if (!e.target.classList.contains('delete-btn')) return;

  const li = e.target.closest('.task-item');
  const id = li.dataset.id;

  li.remove();
  removeFromStorage(id, 'tasks');
  updateTaskCount();
  updateEmptyState();
};

taskList.addEventListener('click', handleDeleteTask);

//Uppgift 3: Markera uppgift som klar

const handleToggleDone = (e) => {
  if (!e.target.classList.contains('task-checkbox')) return;

  const li = e.target.closest('.task-item');
  const id = li.dataset.id;
  const isDone = e.target.checked;

  li.classList.toggle('done', isDone);
  updateDoneInStorage(id, isDone, 'tasks');
  document.querySelector('.filter-btn.active')?.click();

  updateTaskCount();
  updateEmptyState();
};

taskList.addEventListener('change', handleToggleDone);

//Uppgift 4: Sökfunktion

const searchInput = document.querySelector("#search-input");
const searchClear = document.querySelector("#search-clear");
const filterButtons = document.querySelectorAll(".filter-btn");
let currentFilter = "all";

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const tasks = taskList.querySelectorAll(".task-item");

  tasks.forEach(task => {
    const title = task.querySelector(".task-label").textContent.toLowerCase();
    const matchesSearch = title.includes(query);

    const isDone = task.classList.contains("done");

    let matchesFilter = true;

    if (currentFilter === "active") matchesFilter = !isDone;
    if (currentFilter === "done") matchesFilter = isDone;

    if (matchesSearch && matchesFilter) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });

  searchClear.style.display = query.length > 0 ? "block" : "none";
});

// Rensa sökning
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  document.querySelector('.filter-btn.active')?.click();
  searchClear.style.display = "none";
});

//Uppgift 5: Filterflikar

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    const tasks = taskList.querySelectorAll(".task-item");

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    tasks.forEach(task => {
      const title = task.querySelector(".task-label").textContent.toLowerCase();
      const query = searchInput.value.trim().toLowerCase();

      const matchesSearch = title.includes(query);
      const isDone = task.classList.contains("done");

      let matchesFilter = true;

      if (currentFilter === "active") matchesFilter = !isDone;
      if (currentFilter === "done") matchesFilter = isDone;

      if (matchesSearch && matchesFilter) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  });
});

//Uppgift 6: "Rensa klara"-knapp

const handleClearDone = () => {
  const doneTasks = taskList.querySelectorAll('.task-item.done');

  doneTasks.forEach((task) => task.remove());
  clearDoneFromStorage('tasks');
  document.querySelector('.filter-btn.active')?.click();

  updateTaskCount();
  updateEmptyState();
};

clearDoneBtn.addEventListener('click', handleClearDone);

//Uppgift 7: Uppgiftsräknare

const updateTaskCount = () => {
  const activeTasks = taskList.querySelectorAll('.task-item:not(.done)').length;
  taskCount.textContent = `${activeTasks} uppgifter kvar`;
};

//Uppgift 8: Tom-state

function updateEmptyState() {
  const tasks = document.querySelectorAll('#task-list .task-item');
  document.getElementById('empty-state').style.display =
    tasks.length === 0 ? 'block' : 'none';
}

// ── Läs in sparade uppgifter vid sidladdning ──
function loadTasks() {
  const saved = getFromStorage('tasks');
  taskList.innerHTML = '';

  saved.forEach(task => {
    const li = createTaskHtml(task.text, task.due, task.id);
    if (task.done) {
      li.classList.add('done');
      li.querySelector('.task-checkbox').checked = true;
    }
    document.getElementById('task-list').appendChild(li);
  });
  updateTaskCount();
  updateEmptyState();
}

document.addEventListener('DOMContentLoaded', loadTasks);
