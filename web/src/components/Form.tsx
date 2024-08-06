import React, { useState, useEffect } from "react";
import { createTask, updateTheTask } from "@/modules/taskManager";

interface PopupFormProps {
  isVisible: boolean;
  onClose: () => void;
  task: Task | null; // Task details passed from Card component
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "progress" | "completed";
  // Add other properties relevant to your Task
}

const PopupForm: React.FC<PopupFormProps> = ({ isVisible, onClose, task }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "progress" | "completed">(
    "todo"
  );

  useEffect(() => {
    if (task) {
      setTaskName(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  if (!isVisible) {
    return null;
  }

  const handleSave = () => {
    if (task) {
      updateTheTask(task.id, taskName, description, "Intern", false, status);
    } else {
      createTask(taskName, description, "Intern", false, status);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">
          {task ? "Edit Task" : "Create Task"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Task Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="todo"
                name="status"
                value="todo"
                checked={status === "todo"}
                onChange={(e) => setStatus(e.target.value as "todo")}
                className="mr-2"
              />
              <label htmlFor="todo" className="mr-4">
                To Do
              </label>
              <input
                type="radio"
                id="in-progress"
                name="status"
                value="progress"
                checked={status === "progress"}
                onChange={(e) => setStatus(e.target.value as "progress")}
                className="mr-2"
              />
              <label htmlFor="in-progress" className="mr-4">
                In Progress
              </label>
              <input
                type="radio"
                id="completed"
                name="status"
                value="completed"
                checked={status === "completed"}
                onChange={(e) => setStatus(e.target.value as "completed")}
                className="mr-2"
              />
              <label htmlFor="completed">Completed</label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
