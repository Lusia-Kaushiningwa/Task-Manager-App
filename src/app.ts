console.log("JS is running");
class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public completed: boolean = false
  ) {}
}

class TaskManager {
  private tasks: Task[] = [];
  private editId: number | null = null;

  addTask(task: Task): void {
    this.tasks.push(task);
    this.render();
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  markTaskComplete(id: number): void {
    const task = this.getTaskById(id);
    if (task) {
      task.completed = !task.completed;
      this.render();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.render();
  }

  openEditModal(id: number): void {
    const task = this.getTaskById(id);
    if (!task) return;

    this.editId = id;
    (document.getElementById("editTitle") as HTMLInputElement).value = task.title;
    (document.getElementById("editDesc") as HTMLTextAreaElement).value = task.description;
    document.getElementById("modal")!.style.display = "block";
  }

  saveEdit(): void {
    if (this.editId === null) return;
    const task = this.getTaskById(this.editId);

    if (task) {
      task.title = (document.getElementById("editTitle") as HTMLInputElement).value;
      task.description = (document.getElementById("editDesc") as HTMLTextAreaElement).value;
    }

    this.closeModal();
    this.render();
  }

  closeModal(): void {
    document.getElementById("modal")!.style.display = "none";
  }

  render(): void {
    const table = document.getElementById("taskTable")!;
    const search = (document.getElementById("search") as HTMLInputElement).value.toLowerCase();
    const filter = (document.getElementById("filter") as HTMLSelectElement).value;

    table.innerHTML = "";

    let filtered = this.tasks.filter(task =>
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search)
    );

    if (filter === "completed") {
      filtered = filtered.filter(t => t.completed);
    } else if (filter === "pending") {
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

function addTask(): void {
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const desc = (document.getElementById("description") as HTMLTextAreaElement).value;

  if (!title) return;

  manager.addTask(new Task(currentId++, title, desc));

  (document.getElementById("title") as HTMLInputElement).value = "";
  (document.getElementById("description") as HTMLTextAreaElement).value = "";
}

function toggleComplete(id: number): void {
  manager.markTaskComplete(id);
}

function deleteTask(id: number): void {
  manager.deleteTask(id);
}

function openEdit(id: number): void {
  manager.openEditModal(id);
}

function closeModal(): void {
  manager.closeModal();
}

// event listeners
document.getElementById("addBtn")!.addEventListener("click", addTask);
document.getElementById("saveEdit")!.addEventListener("click", () => manager.saveEdit());
document.getElementById("search")!.addEventListener("input", () => manager.render());
document.getElementById("filter")!.addEventListener("change", () => manager.render());

// expose for buttons
(window as any).toggleComplete = toggleComplete;
(window as any).deleteTask = deleteTask;
(window as any).openEdit = openEdit;
(window as any).closeModal = closeModal;
