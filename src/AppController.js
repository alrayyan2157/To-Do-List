import { ProjectUI } from './ui/ProjectUI.js';
import { TodoUI } from './ui/TodoUI.js';
import { ModalUI } from './ui/ModalUI.js';
import { Todo } from './models/Todo.js';

export class AppController {
  constructor(todoManager) {
    this.manager = todoManager;
    this.currentProject = null;

    this.projectUI = new ProjectUI(
      document.getElementById('project-list'),
      (projectId) => this.selectProject(projectId),
      (projectId) => this.deleteProject(projectId)
    );

    this.todoUI = new TodoUI(
      document.getElementById('todo-list'),
      (todoId) => this.toggleTodo(todoId),
      (todoId) => this.openEditModal(todoId),
      (todoId) => this.deleteTodo(todoId)
    );

    this.modalUI = new ModalUI(
      document.getElementById('todo-modal'),
      (data) => this.saveTodo(data)
    );
  }

  init() {
    this.projectUI.render(this.manager.getProjects());

    document.getElementById('add-project-btn')
      .addEventListener('click', () => this.addProject());

    document.getElementById('show-add-todo-btn')
      .addEventListener('click', () => this.modalUI.openForCreate());
  }

  // — Project actions —

  addProject() {
    const input = document.getElementById('new-project-name');
    const name = input.value.trim();
    if (!name) return;
    try {
      this.manager.createProject(name);
      input.value = '';
      this.projectUI.render(this.manager.getProjects());
    } catch (e) {
      alert(e.message);
    }
  }

  selectProject(projectId) {
    this.currentProject = this.manager.getProjectById(projectId);

    this.currentProject._persist = () => this.manager._persist();

    document.getElementById('current-project-title').textContent =
      this.currentProject.name;
    document.getElementById('show-add-todo-btn').classList.remove('hidden');
    this.todoUI.render(this.currentProject.getTodos());
  }

  deleteProject(projectId) {
    this.manager.deleteProject(projectId);
    this.currentProject = null;
    this.projectUI.render(this.manager.getProjects());
    this.todoUI.render([]);
  }

  // — Todo actions —

  toggleTodo(todoId) {
    const todo = this.currentProject.getTodos().find(t => t.id === todoId);
    todo?.toggleComplete();
    this.manager._persist();
    this.todoUI.render(this.currentProject.getTodos());
  }

  openEditModal(todoId) {
    const todo = this.currentProject.getTodos().find(t => t.id === todoId);
    if (todo) this.modalUI.openForEdit(todo);
  }

  deleteTodo(todoId) {
    this.currentProject.removeTodo(todoId);
    this.todoUI.render(this.currentProject.getTodos());
  }

  saveTodo({ id, title, description, dueDate, priority }) {
    if (id) {
      const todo = this.currentProject.getTodos().find(t => t.id === id);
      todo?.updateDetails({ title, description, dueDate, priority });
      this.manager._persist();
    } else {
      this.currentProject.addTodo(new Todo({ title, description, dueDate, priority }));
    }
    this.todoUI.render(this.currentProject.getTodos());
    this.modalUI.close();
  }
}