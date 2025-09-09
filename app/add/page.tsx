"use client";
import { TaskServices } from "@/api/Task";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ITask } from "@/types/Task";
import { CalendarIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const [task, setTask] = useState<ITask>({
    _id: "",
    title: "",
    description: "",
    date: "",
    completed: false,
    category: [],
    colour: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const addTask = async () => {
    await TaskServices.createTask({ ...task });
    setTask({
      _id: "",
      title: "",
      description: "",
      date: "",
      completed: false,
      category: [],
      colour: "",
    });
    redirect("/");
  };

  return (
    <div className=" w-full">
      <div className=" max-w-md mx-auto flex flex-col gap-5">
        <Input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Textarea
          placeholder="Description"
          className="resize-none"
          value={task.description}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <div className="relative flex gap-2">
          <Input
            id="date"
            placeholder="June 01, 2025"
            className="bg-background pr-10"
            value={task.date}
            readOnly // prevent manual typing (optional)
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-3.5" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date ?? undefined);
                  setTask((prev) => ({
                    ...prev,
                    date: date ? date.toISOString().split("T")[0] : "",
                  }));
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Select
          value={task.category?.[0] ?? ""}
          onValueChange={(value) =>
            setTask((prev) => ({
              ...prev,
              category: [value],
            }))
          }
        >
          <SelectTrigger className=" w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={task.colour}
          onValueChange={(value) =>
            setTask((prev) => ({
              ...prev,
              colour: value,
            }))
          }
        >
          <SelectTrigger className=" w-full">
            <SelectValue placeholder="Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="red" className="bg-[red]">
              red
            </SelectItem>
            <SelectItem value="blue" className="bg-[blue]">
              blue
            </SelectItem>
            <SelectItem value="gray" className="bg-[gray]">
              gray
            </SelectItem>
            <SelectItem value="pink" className="bg-[pink]">
              pink
            </SelectItem>
            <SelectItem value="green" className="bg-[green]">
              green
            </SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addTask}></Button>
      </div>
    </div>
  );
}
