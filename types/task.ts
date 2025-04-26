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
  {
    id: "4",
    title: "Prepare monthly report",
    description: "Compile the monthly performance report for leadership.",
    dueDate: "2025-04-30",
    status: Status.COMPLETED,
    priority: Priority.HIGH,
  },
  {
    id: "5",
    title: "Test mobile responsiveness",
    description: "Ensure the web app looks good on mobile devices.",
    dueDate: "2025-05-02",
    status: Status.IN_PROGRESS,
    priority: Priority.MEDIUM,
  },
  {
    id: "6",
    title: "Optimize database queries",
    description: "Improve the speed of critical API endpoints.",
    dueDate: "2025-05-05",
    status: Status.COMPLETED,
    priority: Priority.LOW,
  },
  {
    id: "7",
    title: "Update API documentation",
    description: "Add new endpoints and examples to the API docs.",
    dueDate: "2025-05-06",
    status: Status.IN_PROGRESS,
    priority: Priority.HIGH,
  },
  {
    id: "8",
    title: "Bug bash session",
    description: "Organize a bug bash to identify and fix minor issues.",
    dueDate: "2025-05-04",
    status: Status.COMPLETED,
    priority: Priority.MEDIUM,
  },
  {
    id: "9",
    title: "Set up monitoring tools",
    description: "Integrate performance monitoring tools into the app.",
    dueDate: "2025-05-07",
    status: Status.IN_PROGRESS,
    priority: Priority.LOW,
  },
  {
    id: "10",
    title: "Create onboarding checklist",
    description: "Prepare a checklist for new developers joining the team.",
    dueDate: "2025-05-01",
    status: Status.COMPLETED,
    priority: Priority.HIGH,
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
