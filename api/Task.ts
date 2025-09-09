import { ITask } from "@/types/Task";
import api from "./index";

export const TaskServices = {
  getTasks: async (): Promise<ITask[]> => {
    try {
      const res = await api.get("/tasks");

      return res.data.tasks;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      return [];
    }
  },
  getTask: async (id: string): Promise<ITask> => {
    try {
      const res = await api.get(`/task/${id}`);
      return res.data.task;
    } catch (error) {
      console.error("Failed to fetch task:", error);
      throw new Error("Failed to get task. Please try again.");
    }
  },
  createTask: async (data: Omit<ITask, "_id">): Promise<ITask> => {
    try {
      const res = await api.post("/task/", data);

      return res.data as ITask;
    } catch (error: any) {
      console.error("Failed to create task:", error);

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Failed to create task. Please try again.");
      }
    }
  },
  deleteTask: async (id: string): Promise<void> => {
    const res = await api.delete(`/task/${id}`);
    return res.data;
  },
  updateTask: async (
    task: ITask
  ): Promise<{ message: string; task: ITask }> => {
    try {
      const { _id, ...updates } = task;
      const res = await api.put(`/task/${_id}`, updates);
      return res.data;
    } catch (error) {
      console.error("Failed to update task:", error);
      throw new Error("Failed to update task. Please try again.");
    }
  },
};
