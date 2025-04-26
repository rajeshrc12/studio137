"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Filter, sampleTasks, Task, TaskContextType } from "@/types/task";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [allTasks, setAllTasks] = useState<Task[]>(sampleTasks); // full list
  const [tasks, setTasks] = useState<Task[]>(sampleTasks); // displayed list
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

  const filterTasks = (filters: Filter) => {
    if (!allTasks.length) return;

    let tempTask = [...allTasks];

    // 1. Filter by status
    if (filters.status.length) {
      tempTask = tempTask.filter((task) => filters.status.includes(task.status));
    }

    // 2. Filter by priority
    if (filters.priority.length) {
      tempTask = tempTask.filter((task) => filters.priority.includes(task.priority));
    }

    // 3. Filter by searchText
    if (filters.searchText.trim()) {
      const searchLower = filters.searchText.toLowerCase();
      tempTask = tempTask.filter((task) => task.title.toLowerCase().includes(searchLower) || task.description.toLowerCase().includes(searchLower));
    }

    // 4. Sort
    if (filters.sort === "asc") {
      tempTask.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (filters.sort === "desc") {
      tempTask.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    }

    // 5. Set tasks
    setTasks(tempTask);
  };

  return <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, edit, setEdit, deleteId, setDeleteId, filterTasks }}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
