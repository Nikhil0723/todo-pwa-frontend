"use client";
import { TaskServices } from "@/api/Task";
import { ITask } from "@/types/Task";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const { id } = params as { id: string };

  const [taskDetail, setTaskDetail] = useState<ITask>(); 

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await TaskServices.getTask(id);
        setTaskDetail(data);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      }
    };

    if (id) {
      fetchTask();
      console.log(taskDetail);
    }
  }, [id]);

  if (!taskDetail) {
    return <div>Loading...</div>;
  }

  return <div>{taskDetail.title}</div>;
};

export default Page;
