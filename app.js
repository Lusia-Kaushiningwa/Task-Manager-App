console.log("JS is running");
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
        this.editId = null;
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
    openEditModal(id) {
        const task = this.getTaskById(id);
        if (!task)
            return;
        this.editId = id;
        document.getElementById("editTitle").value = task.title;
        document.getElementById("editDesc").value = task.description;
        document.getElementById("modal").style.display = "block";
    }
    saveEdit() {
        if (this.editId === null)
            return;
        const task = this.getTaskById(this.editId);
        if (task) {
            task.title = document.getElementById("editTitle").value;
            task.description = document.getElementById("editDesc").value;
        }
        this.closeModal();
        this.render();
    }
    closeModal() {
        document.getElementById("modal").style.display = "none";
    }
    render() {
        const table = document.getElementById("taskTable");
        const search = document.getElementById("search").value.toLowerCase();
        const filter = document.getElementById("filter").value;
        table.innerHTML = "";
        let filtered = this.tasks.filter(task => task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search));
        if (filter === "completed") {
            filtered = filtered.filter(t => t.completed);
        }
        else if (filter === "pending") {
            filtered = filtered.filter(t => !t.completed);
        }
        filtered.forEach(task => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.completed ? "✅" : "❌"}</td>
        <td>
          <button onclick="toggleComplete(${task.id})">✔</button>
          <button onclick="openEdit(${task.id})">✏</button>
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
function openEdit(id) {
    manager.openEditModal(id);
}
function closeModal() {
    manager.closeModal();
}
// event listeners
document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("saveEdit").addEventListener("click", () => manager.saveEdit());
document.getElementById("search").addEventListener("input", () => manager.render());
document.getElementById("filter").addEventListener("change", () => manager.render());
// expose for buttons
window.toggleComplete = toggleComplete;
window.deleteTask = deleteTask;
window.openEdit = openEdit;
window.closeModal = closeModal;
export {};
//# sourceMappingURL=app.js.map