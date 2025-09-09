import { TaskServices } from "@/api/Task";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ITask } from "@/types/Task";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";

type EditDailogProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
};

export function EditDailog({ id, isOpen, onClose }: EditDailogProps) {
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

  const handleSaveChanges = async () => {
    try {
      await TaskServices.updateTask(task);
    } catch (error) {
      return console.error("Failed to fetch task:", error);
    }
    return onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
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
                value={task.category?.[0] ?? ""} // show the first selected category
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
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => handleSaveChanges()}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
