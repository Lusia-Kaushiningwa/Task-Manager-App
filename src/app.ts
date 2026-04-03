
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

  editTask(id: number, title: string, desc: string): void {
    const task = this.getTaskById(id);
    if (task) {
      task.title = title;
      task.description = desc;
      this.render();
    }
  }

  render(): void {
    const table = document.getElementById("taskTable")!;
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

function editTaskPrompt(id: number): void {
  const task = manager.getTaskById(id);
  if (!task) return;

  const newTitle = prompt("Edit title:", task.title);
  const newDesc = prompt("Edit description:", task.description);

  if (newTitle !== null && newDesc !== null) {
    manager.editTask(id, newTitle, newDesc);
  }
}

// attach events (module-safe)
document.getElementById("addBtn")!.addEventListener("click", addTask);

// expose for inline buttons
(window as any).toggleComplete = toggleComplete;
(window as any).deleteTask = deleteTask;
(window as any).editTaskPrompt = editTaskPrompt;
