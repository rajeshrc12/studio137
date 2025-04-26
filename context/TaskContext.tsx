"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "@/types/task";

interface Filter {
  action: string;
  payload: string | string[];
}
interface TaskContextType {
  tasks: Task[];
  edit: Task | null;
  deleteId: string | null;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setEdit: (task: Task | null) => void;
  setDeleteId: (id: string | null) => void;
  filterTasks: (filter: Filter) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]); // full list
  const [tasks, setTasks] = useState<Task[]>([]); // displayed list
  const [edit, setEdit] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const addTask = (task: Task) => {
    setAllTasks((prev) => [...prev, task]);
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setAllTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteTask = (id: string) => {
    setAllTasks((prev) => prev.filter((t) => t.id !== id));
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filterTasks = (filter: Filter) => {
    if (!allTasks.length) return;
    let tempTask = JSON.parse(JSON.stringify(allTasks));
    if (filter.action === "asc") {
      tempTask.sort((a: Task, b: Task) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    }
    if (filter.action === "desc") {
      tempTask.sort((a: Task, b: Task) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }
    if (filter.action === "status" && filter.payload.length) {
      tempTask = tempTask.filter((task: Task) => filter.payload.includes(task.status));
    }
    if (filter.action === "priority" && filter.payload.length) {
      tempTask = tempTask.filter((task: Task) => filter.payload.includes(task.priority));
    }
    setTasks(tempTask);
  };

  return <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, edit, setEdit, deleteId, setDeleteId, filterTasks }}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
