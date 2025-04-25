"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "@/types/task";

type TaskContextType = {
  tasks: Task[];
  edit: Task | null;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setEdit: (task: Task | null) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [edit, setEdit] = useState<Task | null>(null);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const updateTask = (updatedTask: Task) => setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  const deleteTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, edit, setEdit }}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
