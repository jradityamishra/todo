import Head from "next/head";
import { Inter } from "next/font/google";
import Card from "@/components/Card";
import PopupForm from "@/components/Form";
import { useState, useEffect } from "react";
import {
  initializeTasks,
  getActiveTasks,
  getCompletedTasks,
  getAllTasks,
  completeTask,
  createTask,
  updateTask,
  deleteTask,
} from "@/modules/taskManager";
import Task from "@/model/Task";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [tasks, setTasks] = useState<{
    active: Task[];
    completed: Task[];
    all: Task[];
  }>({
    active: [],
    completed: [],
    all: [],
  });

  const updateTasks = () => {
    setTasks({
      active: getActiveTasks(),
      completed: getCompletedTasks(),
      all: getAllTasks(),
    });
    console.log(tasks);
  };

  useEffect(() => {
    initializeTasks();
    updateTasks();
  }, []);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <Head>
        <title>Task Management Board</title>
        <meta
          name="description"
          content="Task Management Board using Tailwind CSS"
        />
      </Head>
      <div className="container mx-auto bg-gray-100 p-2 h-[100vh]">
        <div className=" h-14 w-full flex justify-between px-5">
          <h2 className="font-bold text-xl">Task Board</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="50px"
            viewBox="0 -960 960 960"
            width="50px"
            fill="#5f6368"
            className="cursor-pointer"
            onClick={handleOpenPopup}
          >
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              To Do:
              <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-white bg-gray-400 rounded-full">
                {tasks.active.filter((task) => task.status === "todo").length}
              </span>
            </h2>
            <div className="space-y-2">
              {tasks.active
                .filter((task) => task.status === "todo")
                .map((task) => (
                  <Card key={task.id} task={task} onUpdate={updateTasks} />
                ))}
            </div>
          </div>
          <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              In Progress:
              <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                {
                  tasks.active.filter((task) => task.status === "progress")
                    .length
                }
              </span>
            </h2>
            <div className="space-y-2">
              {tasks.active
                .filter((task) => task.status === "progress")
                .map((task) => (
                  <Card key={task.id} task={task} onUpdate={updateTasks} />
                ))}
            </div>
          </div>
          <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              Completed
              <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-white bg-green-400 rounded-full">
                {tasks.completed.length}
              </span>
            </h2>
            <div className="space-y-2">
              {tasks.completed.map((task) => (
                <Card key={task.id} task={task} onUpdate={updateTasks} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <PopupForm
        isVisible={isPopupVisible}
        task={null}
        onClose={handleClosePopup}
      />
    </>
  );
}
