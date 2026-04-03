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
    editTask(id, title, desc) {
        const task = this.getTaskById(id);
        if (task) {
            task.title = title;
            task.description = desc;
            this.render();
        }
    }
    render() {
        const table = document.getElementById("taskTable");
        table.innerHTML = "";
        this.tasks.forEach(task => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.completed ? "✅" : "❌"}</td>
        <td>
          <button onclick="toggleComplete(${task.id})">✔</button>
          <button onclick="editTaskPrompt(${task.id})">✏</button>
          <button onclick="deleteTask(${task.id})">🗑</button>
        </td>
      `;
            table.appendChild(row);
        });
    }
}
const manager = new TaskManager();
let currentId = 1;
function addTask() {
    const title = document.getElementById("title").value;
    const desc = document.getElementById("description").value;
    if (!title)
        return;
    manager.addTask(new Task(currentId++, title, desc));
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
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
// attach events (module-safe)
document.getElementById("addBtn").addEventListener("click", addTask);
// expose for inline buttons
window.toggleComplete = toggleComplete;
window.deleteTask = deleteTask;
window.editTaskPrompt = editTaskPrompt;
export {};
//# sourceMappingURL=app.js.map