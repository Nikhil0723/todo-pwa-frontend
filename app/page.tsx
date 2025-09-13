"use client";
import { TaskServices } from "@/api/Task";
import TaskItem from "@/components/common/TaskItem";
import { ITask } from "@/types/Task";
import { Plus } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const router = useRouter();
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
    console.log("running");
  }, []);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task._id} task={task} />)
      ) : (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center text-white">
            <h1 className="font-bold text-xl">
              You don&apos;t have any tasks yet
            </h1>
            <h3 className="text-xl">Click on the + button to add one</h3>
          </div>
        </div>
      )}
      <div
        className=" rounded-full h-14 w-14 fixed bottom-10 right-60 flex items-center justify-center bg-fuchsia-500 cursor-pointer "
        onClick={() => router.push("/add")}
      >
        <Plus className=" text-4xl text-white font-bold" />
      </div>
    </div>
  );
}
