export class ProjectUI {
  constructor(container, onSelect, onDelete) {
    this.container = container;
    this.onSelect = onSelect;
    this.onDelete = onDelete;
  }

  render(projects) {
    this.container.innerHTML = '';
    projects.forEach(project => {
      const div = document.createElement('div');
      div.textContent = project.name;
      div.style.cursor = 'pointer';
      div.addEventListener('click', () => this.onSelect(project.id));

      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑';
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.onDelete(project.id);
      });

      div.appendChild(delBtn);
      this.container.appendChild(div);
    });
  }
}