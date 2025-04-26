import React, { Fragment, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Task } from "@/types/task";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import { Priority } from "@/types/task";
import { Edit, Trash } from "lucide-react";
import { useTasks } from "@/context/TaskContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const TaskTableRow = ({ task, index }: { task: Task; index: number }) => {
  const { setEdit, setDeleteId, updateTask } = useTasks();
  const [mobileTableData, setMobileTableData] = useState(false);
  return (
    <Fragment>
      <TableRow className={`hidden md:table-row ${index % 2 !== 0 && "bg-[#FFF9F8]"}`}>
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
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
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
      <TableRow className={`md:hidden ${index % 2 !== 0 && "bg-[#FFF9F8]"}`}>
        <TableCell className="font-semibold text-primary w-32">Sr.No</TableCell>
        <TableCell className="flex justify-between">
          {index + 1}
          {mobileTableData ? <FaChevronUp onClick={() => setMobileTableData(!mobileTableData)} /> : <FaChevronDown onClick={() => setMobileTableData(!mobileTableData)} />}
        </TableCell>
      </TableRow>
      <TableRow className={`md:hidden ${index % 2 !== 0 && "bg-[#FFF9F8]"}`}>
        <TableCell className="font-semibold text-primary flex justify-start">Title</TableCell>
        <TableCell className="w-64 break-words whitespace-pre-wrap">{task.title}</TableCell>
      </TableRow>
      {mobileTableData && (
        <>
          <TableRow className="md:hidden">
            <TableCell className="font-semibold text-primary flex justify-start">Description</TableCell>
            <TableCell className="w-64 break-words whitespace-pre-wrap">{task.description}</TableCell>
          </TableRow>
          <TableRow className="md:hidden">
            <TableCell className="font-semibold text-primary">Due Date</TableCell>
            <TableCell>{task.dueDate}</TableCell>
          </TableRow>
          <TableRow className="md:hidden">
            <TableCell className="font-semibold text-primary">Status</TableCell>
            <TableCell>
              <StatusBadge status={task.status} />
            </TableCell>
          </TableRow>
          <TableRow className="md:hidden">
            <TableCell className="font-semibold text-primary">Priority</TableCell>
            <TableCell className="flex justify-between items-center">
              <Select value={task.priority} onValueChange={(e: Priority) => updateTask({ ...task, priority: e })}>
                <SelectTrigger className="border-black w-[110px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-4">
                <Edit onClick={() => setEdit(task)} className="cursor-pointer" size={20} />
                <Trash
                  onClick={() => {
                    console.log(task.id);
                    setDeleteId(task.id);
                  }}
                  className="cursor-pointer"
                  size={20}
                />
              </div>
            </TableCell>
          </TableRow>
        </>
      )}
    </Fragment>
  );
};

export default TaskTableRow;
