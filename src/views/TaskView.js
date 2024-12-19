export class TaskView {
    constructor(taskService) {
        this.taskService = taskService;
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.titleInput = document.querySelector('.task-title-input');
        this.taskInput = document.querySelector('.task-input');
        this.addBtn = document.querySelector('.add-btn');
        this.taskList = document.querySelector('.task-list');
        this.filterSelect = document.querySelector('.filter');
        this.searchInput = document.querySelector('.search-input');
        this.clearBtn = document.querySelector('.clear-btn');
    }

    bindEvents() {
        this.addBtn.addEventListener('click', () => this.handleAddTask());
        this.titleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.taskInput.focus();
        });
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddTask();
        });
        this.filterSelect.addEventListener('change', () => this.renderTasks());
        this.searchInput.addEventListener('input', () => this.renderTasks());
        this.clearBtn.addEventListener('click', () => this.handleClearTasks());
    }

    handleAddTask() {
        const title = this.titleInput.value.trim();
        const description = this.taskInput.value.trim();
        if (title && description) {
            this.taskService.addTask(title, description);
            this.titleInput.value = '';
            this.taskInput.value = '';
            this.titleInput.focus();
            this.renderTasks();
        }
    }

    handleClearTasks() {
        this.taskService.clearTasks();
        this.renderTasks();
    }

    createTaskElement(task) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        const checkbox = document.createElement('div');
        checkbox.className = `checkbox ${task.completed ? 'checked' : ''}`;
        checkbox.addEventListener('click', () => {
            this.taskService.toggleTask(task.id);
            this.renderTasks();
        });
        
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        
        const taskTitle = document.createElement('div');
        taskTitle.className = `task-title ${task.completed ? 'completed' : ''}`;
        taskTitle.textContent = task.title;
        
        const taskText = document.createElement('div');
        taskText.className = `task-text ${task.completed ? 'completed' : ''}`;
        taskText.textContent = task.description;
        
        taskContent.appendChild(taskTitle);
        taskContent.appendChild(taskText);
        
        const actions = document.createElement('div');
        actions.className = 'task-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            const newTitle = prompt('Edit task title:', task.title);
            const newDescription = prompt('Edit task description:', task.description);
            if (newTitle !== null && newDescription !== null) {
                this.taskService.editTask(task.id, newTitle, newDescription);
                this.renderTasks();
            }
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑';
        deleteBtn.addEventListener('click', () => {
            this.taskService.deleteTask(task.id);
            this.renderTasks();
        });
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(actions);
        
        return taskItem;
    }

    renderTasks() {
        const filterValue = this.filterSelect.value.toLowerCase();
        const searchText = this.searchInput.value;
        const filteredTasks = this.taskService.filterTasks(filterValue, searchText);
        
        this.taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            this.taskList.appendChild(this.createTaskElement(task));
        });
    }
}