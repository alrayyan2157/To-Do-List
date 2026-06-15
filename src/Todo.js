export class Todo {
  constructor({ title, description, dueDate, priority = 'Low', checklist = [] }) {
    this.id = crypto.randomUUID(); 
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist; 
    this.isCompleted = false;
  }

  toggleComplete() {
    this.isCompleted = !this.isCompleted;
  }

  updateDetails(updatedFields) {
    Object.assign(this, updatedFields);
  }
}