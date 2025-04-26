export enum Status {
  COMPLETED = "completed",
  IN_PROGRESS = "inProgress",
}

export enum Priority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: Status;
  priority: Priority;
}

export const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Finish UI redesign",
    description: "Complete the final touches for the new dashboard UI.",
    dueDate: "2025-05-01",
    status: Status.IN_PROGRESS,
    priority: Priority.HIGH,
  },
  {
    id: "2",
    title: "Fix authentication bug",
    description: "Resolve login issues reported by users.",
    dueDate: "2025-04-28",
    status: Status.COMPLETED,
    priority: Priority.MEDIUM,
  },
  {
    id: "3",
    title: "Set up deployment pipeline",
    description: "Create an automated deployment workflow for staging.",
    dueDate: "2025-05-03",
    status: Status.IN_PROGRESS,
    priority: Priority.LOW,
  },
];

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
