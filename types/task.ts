export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Completed" | "In Progress";
  priority: "High" | "Medium" | "Low";
};
