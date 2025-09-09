import { ITask } from "@/types/Task";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TaskMenu } from "./TaskMenu";

const TaskItem = ({ task }: { task: ITask }) => {
  const { _id, title, description, date, category, colour, completed } = task;
  return (
    <div
      className={` flex items-center justify-between gap-4 ${
        colour ? `bg-${[colour]}` : "bg-fuchsia-500"
      } bg-fuchsia-500 p-4 rounded-3xl text-white`}
    >
      {completed && (
        <div className=" bg-white  h-16 w-16 flex items-center justify-center rounded-2xl">
          <h1 className=" text-4xl ">😅</h1>
        </div>
      )}
      <div className=" flex-1">
        <div className=" flex items-start justify-between">
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <p> {date}</p>
        </div>
        <p>9/11/2025 • 7:52:00 AM • Thursday (in 7 days) Home Work</p>
      </div>

      <TaskMenu id={_id} />
    </div>
  );
};

export default TaskItem;
