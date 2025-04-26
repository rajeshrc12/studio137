import { TaskProvider } from "@/context/TaskContext";
import TaskTable from "@/components/TaskTable";
import Filter from "@/components/Filter";
import Image from "next/image";

export default function HomePage() {
  return (
    <TaskProvider>
      <div className="flex flex-col gap-5 w-full px-5 md:px-10 py-5 bg-[#FCFCFC]">
        <div className="flex justify-between items-center">
          <div>
            <Image unoptimized height={50} width={50} alt="logo" src={"/logo.jpg"} />
            <h1 className="font-bold text-xl mt-5">Tasks</h1>
          </div>
          <Filter />
        </div>
        <TaskTable />
      </div>
    </TaskProvider>
  );
}
