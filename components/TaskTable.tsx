import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Status from "./Status";
import { Edit, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tasks = [
  {
    id: "1",
    title: "title",
    description: "This is a long description that should occupy more space.",
    dueDate: "20-09-2022",
    status: "completed",
    priority: "Low",
  },
  {
    id: "2",
    title: "title",
    description: "This is a long description that should occupy more space.",
    dueDate: "20-09-2022",
    status: "inProgress",
    priority: "Medium",
  },
];

const TaskTable = () => {
  return (
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow className="border-primary">
          <TableHead className="whitespace-nowrap w-16">SL.No</TableHead>
          <TableHead className="whitespace-nowrap w-32">Title</TableHead>
          <TableHead className="w-full">Description</TableHead>
          <TableHead className="whitespace-nowrap w-32">Due Date</TableHead>
          <TableHead className="whitespace-nowrap w-32">Status</TableHead>
          <TableHead className="whitespace-nowrap w-32">Priority</TableHead>
          <TableHead className="whitespace-nowrap w-20 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, index) => (
          <TableRow key={task.id}>
            <TableCell className="whitespace-nowrap">{index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{task.title}</TableCell>
            <TableCell className="truncate">{task.description}</TableCell>
            <TableCell className="whitespace-nowrap">{task.dueDate}</TableCell>
            <TableCell className="whitespace-nowrap">
              <Status status={task.status} />
            </TableCell>
            <TableCell className="whitespace-nowrap">
              <Select value={task.priority}>
                <SelectTrigger className="border-black w-[110px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="flex justify-center gap-2 mt-2">
              <Edit className="cursor-pointer" size={20} />
              <Trash className="cursor-pointer" size={20} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
