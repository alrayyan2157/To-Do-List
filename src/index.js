// src/index.js
import { StorageService } from './StorageService.js';
import { TodoManager } from './models/TodoManager.js';
import { AppController } from './AppController.js';
import './styles.css';

const storage = new StorageService();
const manager = new TodoManager(storage);
const app = new AppController(manager);
app.init();