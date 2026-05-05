declare class Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    constructor(id: number, title: string, description: string, completed?: boolean);
}
declare class TaskManager {
    private tasks;
    private editId;
    addTask(task: Task): void;
    getTaskById(id: number): Task | undefined;
    markTaskComplete(id: number): void;
    deleteTask(id: number): void;
    openEditModal(id: number): void;
    saveEdit(): void;
    closeModal(): void;
    render(): void;
}
declare const manager: TaskManager;
declare let currentId: number;
declare function addTask(): void;
declare function toggleComplete(id: number): void;
declare function deleteTask(id: number): void;
declare function openEdit(id: number): void;
declare function closeModal(): void;
//# sourceMappingURL=app.d.ts.map