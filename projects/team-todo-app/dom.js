const createTaskHtml = (taskText, dueDate, id) => {
  const li = document.createElement('li');
  li.classList.add('task-item');
  li.dataset.id = id;

  if (dueDate) {
    li.dataset.due = dueDate;
  }

  // Drag handle
  const dragHandle = document.createElement('span');
  dragHandle.classList.add('drag-handle');
  dragHandle.textContent = '⠿';

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-checkbox');

  // Label
  const label = document.createElement('label');
  label.classList.add('task-label');
  label.textContent = taskText;

  // Due tag
  const dueTag = document.createElement('span');
  dueTag.classList.add('due-tag');

  if (dueDate) {
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const formatted = due.toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
    });
    dueTag.textContent = `Senast ${formatted}`;

    if (due < today) {
      dueTag.classList.add('overdue');
    } else if (due.getTime() === today.getTime()) {
      dueTag.classList.add('today');
    }
  }

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('aria-label', 'Ta bort');
  deleteBtn.textContent = '✕';

  li.appendChild(dragHandle);
  li.appendChild(checkbox);
  li.appendChild(label);
  if (dueDate) li.appendChild(dueTag);
  li.appendChild(deleteBtn);

  return li;
};