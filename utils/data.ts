import { Priority, Status, Task } from "@/types/task";

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
