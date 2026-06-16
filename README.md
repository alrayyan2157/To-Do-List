# Todo App

A modular, SOLID-principled todo list app built with vanilla JavaScript. Supports multiple projects, priority levels, due dates, and persistent storage via localStorage.

---

## Features

- Create and delete multiple **projects**
- Add, edit, delete, and complete **todos** per project
- Set **priority** (Low / Medium / High) with color-coded indicators
- Set **due dates** per todo
- **Persists data** across page reloads via localStorage
- Clean, minimal UI with modal-based todo editing

---

## Project Structure

```
src/
├── models/
│   ├── Project.js          # Project class — holds todos
│   ├── Todo.js             # Todo class — title, description, date, priority
│   └── TodoManager.js      # Manages project list + persistence calls
├── ui/
│   ├── ProjectUI.js        # Renders the sidebar project list
│   ├── TodoUI.js           # Renders the todo list
│   └── ModalUI.js          # Handles modal open / close / save
├── AppController.js        # Wires events and coordinates UI + models
├── StorageService.js       # Reads and writes to localStorage
├── index.js                # Entry point — bootstraps the app
└── styles.css              # Layout and component styles
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- A bundler — the project is set up for [Webpack](https://webpack.js.org/) or [Vite](https://vitejs.dev/)

### Install

```bash
npm install
```

### Run (development)

```bash
npm start
```

### Build (production)

```bash
npm run build
```

---

## Architecture

This project follows **SOLID principles** throughout:

| Principle | How it's applied |
|---|---|
| **Single Responsibility** | Each class has one job — `StorageService` only handles storage, `ProjectUI` only renders projects |
| **Open / Closed** | UI renderers accept data via callbacks — adding a new view doesn't require editing existing ones |
| **Liskov Substitution** | `TodoManager` accepts any storage service that implements `save()` / `load()` |
| **Interface Segregation** | `ProjectUI` never receives todo data; `TodoUI` never receives project data |
| **Dependency Inversion** | `AppController` receives `todoManager` via injection; UI classes receive callbacks, not references to other classes |

### Data flow

```
User action
  → AppController method
    → TodoManager mutation  →  StorageService.save()  →  localStorage
    → UI re-render

App load
  → StorageService.load()
    → JSON hydrated back into Project + Todo instances
      → TodoManager initialized with restored state
```

### Storage & hydration

`JSON.stringify` flattens class instances to plain objects. On load, `StorageService._hydrateProjects()` reconstructs real `Project` and `Todo` instances so all class methods (`toggleComplete`, `updateDetails`, etc.) remain available.

---

## Classes

### `Todo`

```js
new Todo({ title, description, dueDate, priority, checklist })
```

| Property | Type | Description |
|---|---|---|
| `id` | string | Auto-generated UUID |
| `title` | string | Todo title |
| `description` | string | Optional detail |
| `dueDate` | string | ISO date string (YYYY-MM-DD) |
| `priority` | `'Low' \| 'Medium' \| 'High'` | Priority level |
| `isCompleted` | boolean | Completion state |

Methods: `toggleComplete()`, `updateDetails(fields)`

### `Project`

```js
new Project(name)
```

Methods: `addTodo(todo)`, `removeTodo(todoId)`, `getTodos()`

### `TodoManager`

```js
new TodoManager(storageService)
```

Methods: `createProject(name)`, `deleteProject(id)`, `getProjects()`, `getProjectById(id)`

Always ensures a default **Inbox** project exists.

### `StorageService`

```js
new StorageService()
```

Methods: `save(projects)`, `load()`, `clear()`

---

## Styling

Priority levels are indicated by a left border accent on each todo card:

| Priority | Color |
|---|---|
| High | Red (`#E24B4A`) |
| Medium | Amber (`#EF9F27`) |
| Low | Green (`#639922`) |

The layout uses CSS Grid (`260px sidebar + 1fr main`) contained in a single card, so there is no full-page overflow or left-shift.
