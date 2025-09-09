// components/TaskMenu.tsx
import { TaskServices } from "@/api/Task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EditDailog } from "../EditDailog";
import { ITask } from "@/types/Task";

export function TaskMenu({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [isEditDailogOpen, setIsEditDailogOpen] = useState(false);
  const [task, setTask] = useState<ITask>({
    _id: "",
    title: "",
    description: "",
    date: "",
    completed: false,
    category: [],
    colour: "",
    pinned: false, 
  });
  const router = useRouter();
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await TaskServices.getTask(id);
        setTask(data);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);
  const closeEditDailog = () => {
    setIsEditDailogOpen(false);
  };

  const handleCompleted = async () => {
    try {
      const updated = await TaskServices.updateTask({
        ...task,
        completed: !task.completed,
      });
      setTask(updated.task);
      console.log({ updated: updated });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handlePinned = async () => {
    try {
      const updated = await TaskServices.updateTask({
        ...task,
        pinned: !task.pinned,
      });
      setTask(updated.task);
      console.log({ updated: updated });
    } catch (error) {
      console.error("Failed to pin task:", error);
    }
  };

  const handleDelete = async () => {
    console.log(id);
    try {
      await TaskServices.deleteTask(id);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const TaskDetail = () => {
    router.push(`/task/${id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BiDotsVerticalRounded
          className="mx-2 cursor-pointer hover:text-gray-600 transition-colors"
          size={24}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 p-2" align="start" sideOffset={5}>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleCompleted}
          >
            {task.completed ? "Mark as not Done" : "Mark as Done"}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handlePinned}>
            {task.pinned ? "unpin" : "pinned"}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={TaskDetail}>
            Task details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditDailogOpen(true)}>
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 cursor-pointer focus:bg-red-100"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
      <EditDailog id={id} isOpen={isEditDailogOpen} onClose={closeEditDailog} />
    </DropdownMenu>
  );
}
