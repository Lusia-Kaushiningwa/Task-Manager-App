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

  editTask(id: number, newTitle: string, newDescription: string): void {
    const task = this.getTaskById(id);
    if (task) {
      task.title = newTitle;
      task.description = newDescription;
      this.render();
    }
  }

  render(): void {
    const taskList = document.getElementById("taskList")!;
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
function addTask(): void {
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const descInput = document.getElementById("description") as HTMLTextAreaElement;

  if (!titleInput.value) return;

  const task = new Task(currentId++, titleInput.value, descInput.value);
  manager.addTask(task);

  titleInput.value = "";
  descInput.value = "";
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
