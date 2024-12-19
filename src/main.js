import { TaskService } from './services/TaskService.js';
import { TaskView } from './views/TaskView.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskService = new TaskService();
    const taskView = new TaskView(taskService);
    taskView.renderTasks();
});