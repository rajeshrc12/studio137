export enum Status {
  COMPLETED = "completed",
  IN_PROGRESS = "inProgress",
}

export enum Priority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}
export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: Status;
  priority: Priority;
};
