"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/context/TaskContext";
import { Task } from "@/types/task";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";

export default function AddTaskDialog() {
  const { addTask } = useTasks();
  const [form, setForm] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "In Progress",
  });

  const handleSubmit = () => {
    addTask({ id: uuidv4(), ...form });
    setForm({ title: "", description: "", dueDate: "", priority: "Medium", status: "In Progress" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus color="#ffffff" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Select value={form.priority} onValueChange={(val) => setForm({ ...form, priority: val as Task["priority"] })}>
            <SelectTrigger className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val as Task["status"] })}>
            <SelectTrigger className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit} className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Add Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
