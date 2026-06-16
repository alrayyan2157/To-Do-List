export class Project {
  constructor(name, storageCallback = null) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
    this._persist = storageCallback;
  }

  addTodo(todo) {
    this.todos.push(todo);
    this._persist?.();
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
    this._persist?.();
  }

  getTodos() {
    return this.todos;
  }
}