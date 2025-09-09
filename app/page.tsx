"use client";
import { TaskServices } from "@/api/Task";
import TaskItem from "@/components/common/TaskItem";
import { ITask } from "@/types/Task";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const loadTasks = async () => {
    try {
      const data = await TaskServices.getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };
  useEffect(() => {
    loadTasks();
  }, [tasks]);
  return (
    <div className=" max-w-3xl mx-auto flex flex-col gap-4 ">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.title} task={task} />)
      ) : (
        <div>
          <h1>You don&apos;t have any tasks yet </h1>
          <h3> Click on the + button to add one</h3>
        </div>
      )}
    </div>
  );
}
