export enum Status {
  COMPLETED = "completed",
  IN_PROGRESS = "inProgress",
}

export enum Priority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: Status;
  priority: Priority;
}

export interface Filter {
  status: string[];
  priority: string[];
  sort: "asc" | "desc";
  searchText: string;
}
export interface TaskContextType {
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
