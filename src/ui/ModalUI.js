export class ModalUI {
  constructor(modalEl, onSave) {
    this.modal = modalEl;
    this.onSave = onSave;
    this.editingId = null;

    document.getElementById('modal-save-btn')
      .addEventListener('click', () => this.handleSave());
    document.getElementById('modal-close-btn')
      .addEventListener('click', () => this.close());
  }

  openForCreate() {
    this.editingId = null;
    this._clearFields();
    this.modal.classList.remove('hidden');
  }

  openForEdit(todo) {
    this.editingId = todo.id;
    document.getElementById('modal-title').value = todo.title;
    document.getElementById('modal-desc').value = todo.description;
    document.getElementById('modal-date').value = todo.dueDate ?? '';
    document.getElementById('modal-priority').value = todo.priority;
    this.modal.classList.remove('hidden');
  }

  close() {
    this.modal.classList.add('hidden');
    this._clearFields();
  }

  handleSave() {
    this.onSave({
      id: this.editingId,
      title: document.getElementById('modal-title').value,
      description: document.getElementById('modal-desc').value,
      dueDate: document.getElementById('modal-date').value,
      priority: document.getElementById('modal-priority').value,
    });
  }

  _clearFields() {
    ['modal-title', 'modal-desc', 'modal-date'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('modal-priority').value = 'Low';
  }
}