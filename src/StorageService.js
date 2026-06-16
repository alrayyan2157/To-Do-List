// src/StorageService.js
import { Project } from './models/Project.js';
import { Todo } from './models/Todo.js';

const STORAGE_KEY = 'todo-app-data';

export class StorageService {

  // — Save —

  save(projects) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('StorageService: failed to save', e);
    }
  }

  // — Load & Hydrate —

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return this._hydrateProjects(parsed);
    } catch (e) {
      console.error('StorageService: failed to load', e);
      return null;
    }
  }

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }

  _hydrateProjects(rawProjects) {
    return rawProjects.map(rawProject => {
      const project = new Project(rawProject.name);
      project.id = rawProject.id;
      project.todos = rawProject.todos.map(t => this._hydrateTodo(t));
      return project;
    });
  }

  _hydrateTodo(raw) {
    const todo = new Todo({
      title: raw.title,
      description: raw.description,
      dueDate: raw.dueDate,
      priority: raw.priority,
      checklist: raw.checklist ?? [],
    });
    todo.id = raw.id;
    todo.isCompleted = raw.isCompleted;
    return todo;
  }
}