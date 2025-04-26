import { TaskProvider } from "@/context/TaskContext";
import TaskTable from "@/components/TaskTable";
import AddTaskDialog from "@/components/AddTaskDialog";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";
import Image from "next/image";

export default function HomePage() {
  return (
    <TaskProvider>
      <div className="flex flex-col gap-5 w-full px-10">
        <div className="flex justify-between items-center">
          <Image height={50} width={50} alt="logo" src={"/logo.jpg"} />
          <SearchBar />
        </div>
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Tasks</h1>
          <div className="flex gap-2">
            <AddTaskDialog />
            <Filter />
          </div>
        </div>

        <TaskTable />
      </div>
    </TaskProvider>
  );
}
