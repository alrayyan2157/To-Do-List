export class TodoUI {
  constructor(container, onToggle, onEdit, onDelete) {
    this.container = container;
    this.onToggle = onToggle;
    this.onEdit = onEdit;
    this.onDelete = onDelete;
  }

  render(todos) {
    this.container.innerHTML = '';
    todos.forEach(todo => {
      const div = document.createElement('div');
      div.className = `todo-item priority-${todo.priority}`;
      if (todo.isCompleted) div.style.textDecoration = 'line-through';

      div.innerHTML = `<span>${todo.title} — ${todo.dueDate ?? 'No date'}</span>`;

      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = todo.isCompleted ? '↩' : '✅';
      toggleBtn.addEventListener('click', () => this.onToggle(todo.id));

      const editBtn = document.createElement('button');
      editBtn.textContent = '✏️';
      editBtn.addEventListener('click', () => this.onEdit(todo.id));

      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑';
      delBtn.addEventListener('click', () => this.onDelete(todo.id));

      div.append(toggleBtn, editBtn, delBtn);
      this.container.appendChild(div);
    });
  }
}