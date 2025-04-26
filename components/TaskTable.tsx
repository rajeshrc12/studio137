"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import { Edit, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTasks } from "@/context/TaskContext";
import EditTaskDialog from "./EditTaskDialog";
import { Priority } from "@/types/task";
import DeleteTaskDialog from "./DeleteTaskDialog";

const TaskTable = () => {
  const { tasks, setEdit, setDeleteId, updateTask } = useTasks();
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
            <TableCell className="truncate">{task.title}</TableCell>
            <TableCell className="truncate">{task.description}</TableCell>
            <TableCell className="whitespace-nowrap">{task.dueDate}</TableCell>
            <TableCell className="whitespace-nowrap">
              <StatusBadge status={task.status} />
            </TableCell>
            <TableCell className="whitespace-nowrap">
              <Select value={task.priority} onValueChange={(e: Priority) => updateTask({ ...task, priority: e })}>
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
              <Edit onClick={() => setEdit(task)} className="cursor-pointer" size={20} />
              <Trash
                onClick={() => {
                  console.log(task.id);
                  setDeleteId(task.id);
                }}
                className="cursor-pointer"
                size={20}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <EditTaskDialog />
      <DeleteTaskDialog />
    </Table>
  );
};

export default TaskTable;
