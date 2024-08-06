import React, { useState } from "react";
import Task from "@/model/Task";
import { completeTask, deleteTask, updateTask } from "@/modules/taskManager";
import PopupForm from "@/components/Form";
interface CardProps {
  task: Task;
  onUpdate: () => void;
}

const Card: React.FC<CardProps> = ({ task, onUpdate }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleMoveToInProgress = () => {
    updateTask(task.id, { status: "progress" });
    onUpdate();
  };

  const handleMoveToCompleted = () => {
    completeTask(task.title);
    onUpdate();
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    onUpdate();
  };

  return (
    <>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="mb-5 border-b-2 border-gray-300 flex justify-between items-center">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {task.title}
          </h5>
          <div className="flex gap-2">
            {task.status === "todo" && (
              <button
                onClick={handleMoveToInProgress}
                className="text-white mr-2 px-[10px] py-[2px] rounded-xl bg-yellow-500"
              >
                Progress
              </button>
            )}
            {task.status === "progress" && (
              <button
                onClick={handleMoveToCompleted}
                className="text-white mr-2 px-[10px] py-[2px] rounded-xl bg-green-500"
              >
                Completed
              </button>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleOpenPopup}
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M520-400h80v-120h120v-80H600v-120h-80v120H400v80h120v120ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
            </svg>
            <svg
              onClick={handleDeleteTask}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#f54242"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </div>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {task.description}
        </p>
      </div>
      <PopupForm
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
        task={task}
      />
    </>
  );
};

export default Card;
