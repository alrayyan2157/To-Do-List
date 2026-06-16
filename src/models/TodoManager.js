import { Project } from './Project.js';

export class TodoManager {
  constructor() {
    this.projects = [];
    this.ensureDefaultProject();
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
    return newProject;
  }

  deleteProject(projectId) {
    this.projects = this.projects.filter(p => p.id !== projectId);
    this.ensureDefaultProject();
  }

  getProjects() {
    return this.projects;
  }

  getProjectById(projectId) {
    return this.projects.find(p => p.id === projectId);
  }
}