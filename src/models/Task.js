export class Task {
    constructor(title, description) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.completed = false;
    }
}