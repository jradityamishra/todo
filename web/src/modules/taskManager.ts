import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

// Function to initialize tasks with "todo" status
export function initializeTasks() {
  tasks = initialTasks.filter(task => task.group === 1);
}

export function getActiveTasks(): Task[] {
  return tasks.filter(task => !task.completed && (task.status === "todo" || task.status === "progress"));
}

// GET ALL ACTIVE TASK

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

// GET ALL TASK

export function getAllTasks(): Task[] {
  return tasks;
}

// COMPLETE TASK

export function completeTask(taskTitle: string): void {
  const task = tasks.find(task => task.title === taskTitle);
  if (task) {
    task.completed = true;
    task.status = "completed"; 
    const currentGroupTasks = tasks.filter(t => t.group === task.group);
    if (currentGroupTasks.every(t => t.completed)) {
      loadNextGroupTasks(task.group + 1);
    }
  }
}

// CREATE A NEW TASK

export function createTask(title: string, description: string, persona: string, completed: boolean, status: "todo" | "progress" | "completed"): void {
  const newTask = new Task(tasks.length + 1, title, description, persona, 1, completed, status); // Default group to 1 or adjust as needed
  tasks.push(newTask);
  initialTasks.push(newTask);
}

// UPDATE EXISTING TASK

export function updateTheTask(id: number, title?: string, description?: string, persona?: string, completed?: boolean ,status?: "todo" | "progress" | "completed"
): void {const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    const task = tasks[taskIndex];
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (persona !== undefined) task.persona = persona;
    if (completed !== undefined) task.completed = completed;
    if (status !== undefined) task.status = status;
  } else {
    console.error(`Task with id ${id} not found.`);
  }
}

// UPDATE STATE

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    Object.assign(task, updatedTask);
  }
}

// DELETE TASK

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}

// LOAD NEW TASK

function loadNextGroupTasks(group: number) {
  const nextGroupTasks = initialTasks.filter(task => task.group === group);
  const uniqueNextGroupTasks = nextGroupTasks.filter(nextTask =>
    !tasks.some(existingTask => existingTask.id === nextTask.id)
  );
  tasks.push(...uniqueNextGroupTasks);

  console.log(`Loaded tasks for group ${group}`);
  console.log(tasks);
}
