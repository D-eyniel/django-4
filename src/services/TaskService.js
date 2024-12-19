import { Task } from '../models/Task.js';

export class TaskService {
    constructor() {
        this.tasks = [];
    }

    addTask(title, description) {
        const task = new Task(title, description);
        this.tasks.push(task);
        return task;
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
        }
        return task;
    }

    editTask(id, newTitle, newDescription) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle.trim();
            task.description = newDescription.trim();
        }
        return task;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }

    clearTasks() {
        this.tasks = [];
    }

    filterTasks(filterValue, searchText) {
        return this.tasks.filter(task => {
            const matchesFilter = 
                filterValue === 'all' ||
                (filterValue === 'active' && !task.completed) ||
                (filterValue === 'completed' && task.completed);
            
            const searchLower = searchText.toLowerCase();
            const matchesSearch = 
                task.title.toLowerCase().includes(searchLower) ||
                task.description.toLowerCase().includes(searchLower);
            
            return matchesFilter && matchesSearch;
        });
    }
}