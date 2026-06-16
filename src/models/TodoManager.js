import { Project } from './Project.js';

export class TodoManager {
  constructor(storageService) {
    this.storageService = storageService;
    this.projects = [];
    this._loadFromStorage();
    this.ensureDefaultProject();
  }

  _loadFromStorage() {
    const saved = this.storageService?.load();
    if (saved && saved.length > 0) {
      this.projects = saved;
    }
  }

  _persist() {
    this.storageService?.save(this.projects);
  }


  ensureDefaultProject() {
    if (this.projects.length === 0) {
      this.createProject('Inbox');
    }
  }

  createProject(name) {
    if (this.projects.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      throw new Error('Project name already exists.');
    }
    const newProject = new Project(name);
    this.projects.push(newProject);
    this._persist();
    return newProject;
  }

  deleteProject(projectId) {
    this.projects = this.projects.filter(p => p.id !== projectId);
    this.ensureDefaultProject();
    this._persist();
  }

  getProjects() {
    return this.projects;
  }

  getProjectById(projectId) {
    return this.projects.find(p => p.id === projectId);
  }
}