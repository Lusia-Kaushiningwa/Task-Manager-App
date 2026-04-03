class Task {
    constructor(id, title, description, completed = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}
class TaskManager {
    constructor() {
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
        this.render();
    }
    getTaskById(id) {
        return this.tasks.find(t => t.id === id);
    }
    markTaskComplete(id) {
        const task = this.getTaskById(id);
        if (task) {
            task.completed = !task.completed;
            this.render();
        }
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.render();
    }
    editTask(id, newTitle, newDescription) {
        const task = this.getTaskById(id);
        if (task) {
            task.title = newTitle;
            task.description = newDescription;
            this.render();
        }
    }
    render() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        this.tasks.forEach(task => {
            const div = document.createElement("div");
            div.className = "task";
            div.innerHTML = `
        <h3>${task.title} ${task.completed ? "✔️" : ""}</h3>
        <p>${task.description}</p>
        <button onclick="toggleComplete(${task.id})">Toggle Complete</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
        <button onclick="editTaskPrompt(${task.id})">Edit</button>
      `;
            taskList.appendChild(div);
        });
    }
}
// Instantiate manager
const manager = new TaskManager();
let currentId = 1;
// UI Functions
function addTask() {
    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("description");
    if (!titleInput.value)
        return;
    const task = new Task(currentId++, titleInput.value, descInput.value);
    manager.addTask(task);
    titleInput.value = "";
    descInput.value = "";
}
function toggleComplete(id) {
    manager.markTaskComplete(id);
}
function deleteTask(id) {
    manager.deleteTask(id);
}
function editTaskPrompt(id) {
    const task = manager.getTaskById(id);
    if (!task)
        return;
    const newTitle = prompt("Edit title:", task.title);
    const newDesc = prompt("Edit description:", task.description);
    if (newTitle !== null && newDesc !== null) {
        manager.editTask(id, newTitle, newDesc);
    }
}
export {};
//# sourceMappingURL=app.js.map