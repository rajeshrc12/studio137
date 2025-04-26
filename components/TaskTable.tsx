"use client";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTasks } from "@/context/TaskContext";
import EditTaskDialog from "@/components/EditTaskDialog";
import DeleteTaskDialog from "@/components/DeleteTaskDialog";
import TaskTableRow from "@/components/TaskTableRow";

const TaskTable = () => {
  const { tasks } = useTasks();
  if (!tasks.length) return <div>No task available</div>;
  return (
    <Table className="w-full table-fixed">
      <TableHeader className="hidden md:table-header-group">
        <TableRow className="border-primary">
          <TableHead className="whitespace-nowrap w-16">SL.No</TableHead>
          <TableHead className="md:w-full">Title</TableHead>
          <TableHead className="md:w-full">Description</TableHead>
          <TableHead className="whitespace-nowrap w-32">Due Date</TableHead>
          <TableHead className="whitespace-nowrap w-32">Status</TableHead>
          <TableHead className="whitespace-nowrap w-32">Priority</TableHead>
          <TableHead className="whitespace-nowrap w-20 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, index) => (
          <TaskTableRow key={task.id} task={task} index={index} />
        ))}
      </TableBody>
      <EditTaskDialog />
      <DeleteTaskDialog />
    </Table>
  );
};

export default TaskTable;
