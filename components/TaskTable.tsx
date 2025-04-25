import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tasks = [
  {
    id: "1",
    title: "title",
    description: "THis is description",
    dueDate: "20-09-2022",
    status: "Completed",
    priority: "Medium",
  },
];

const TaskTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SL.No</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, index) => (
          <TableRow key={task.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.priority}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TaskTable;
