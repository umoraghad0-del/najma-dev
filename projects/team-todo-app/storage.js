const addToStorage = (task, key) => {
  const tasks = getFromStorage(key);
  tasks.push(task);
  localStorage.setItem(key, JSON.stringify(tasks));
};

const getFromStorage = (key) => {
  const stored = localStorage.getItem(key);
  return stored === null ? [] : JSON.parse(stored);
};

const removeFromStorage = (id, key) => {
  let tasks = getFromStorage(key);
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem(key, JSON.stringify(tasks));
};

const updateDoneInStorage = (id, done, key) => {
  const tasks = getFromStorage(key);
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = done;
    localStorage.setItem(key, JSON.stringify(tasks));
  }
};

//Uppgift 6: "Rensa klara"-knapp

const clearDoneFromStorage = (key) => {
  const tasks = getFromStorage(key);
  const activeTasks = tasks.filter((task) => !task.done);
  localStorage.setItem(key, JSON.stringify(activeTasks));
};

// Exporterar funktionerna för testning

module.exports = {
  addToStorage,
  getFromStorage,
  removeFromStorage,
  updateDoneInStorage,
  clearDoneFromStorage
};
