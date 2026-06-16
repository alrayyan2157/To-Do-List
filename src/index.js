import { TodoManager } from './models/TodoManager.js';
import { AppController } from './AppController.js';
import './styles.css';

const manager = new TodoManager();
const app = new AppController(manager);
app.init();