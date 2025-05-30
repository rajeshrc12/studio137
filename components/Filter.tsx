"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaSearch } from "react-icons/fa";
import { Priority, Status } from "@/types/task";
import { useTasks } from "@/context/TaskContext";
import AddTaskDialog from "@/components/AddTaskDialog";
import { IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";

let timeout: NodeJS.Timeout | null = null;

const Filter = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchText, setSearchText] = useState("");
  const [mobileSearchBar, setMobileSearchBar] = useState(false);

  const { filterTasks } = useTasks();

  const activeFiltersCount = selectedStatus.length + selectedPriority.length;
  const isFilterActive = activeFiltersCount > 0;

  const applyFilters = (status: string[], priority: string[], sortOrder: "asc" | "desc", searchText: string) => {
    filterTasks({ status, priority, sort: sortOrder, searchText });
  };

  const toggleFilter = (type: "status" | "priority", value: string) => {
    if (type === "status") {
      const updatedStatus = selectedStatus.includes(value) ? selectedStatus.filter((v) => v !== value) : [...selectedStatus, value];
      setSelectedStatus(updatedStatus);
      applyFilters(updatedStatus, selectedPriority, sortOrder, searchText);
    } else {
      const updatedPriority = selectedPriority.includes(value) ? selectedPriority.filter((v) => v !== value) : [...selectedPriority, value];
      setSelectedPriority(updatedPriority);
      applyFilters(selectedStatus, updatedPriority, sortOrder, searchText);
    }
  };

  const handleSortChange = (value: "asc" | "desc") => {
    setSortOrder(value);
    applyFilters(selectedStatus, selectedPriority, value, searchText);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      applyFilters(selectedStatus, selectedPriority, sortOrder, value);
      timeout = null;
    }, 500);
  };

  return (
    <div className="flex flex-col items-center gap-4 flex-wrap">
      {/* Search Input */}
      <div className="w-[200px] md:hidden flex justify-end">
        {mobileSearchBar ? (
          <div className="flex gap-2 items-center justify-end rounded border border-[#9B9B9B] px-2 py-1 w-full">
            <FaSearch color="#9B9B9B" />
            <input onBlur={() => setMobileSearchBar(false)} className="w-full md:w-[250px] border-none outline-none" placeholder="Search by title" value={searchText} onChange={handleSearchChange} />
          </div>
        ) : (
          <Button onClick={() => setMobileSearchBar(true)} className="my-1">
            <FaSearch color="#ffffff" />
          </Button>
        )}
      </div>

      <div className="hidden md:flex gap-2 items-center justify-end rounded border border-[#9B9B9B] px-2 py-1 w-full">
        <FaSearch color="#9B9B9B" />
        <input className="w-full md:w-[250px] border-none outline-none" placeholder="Search by title" value={searchText} onChange={handleSearchChange} />
      </div>
      <div className="flex gap-2 justify-between w-full">
        <AddTaskDialog />

        {/* Filter Button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={isFilterActive ? "default" : "outline"} className="relative">
              <IoFilter />
              <span className="hidden md:block ml-1">Filter</span>
              {isFilterActive && <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{activeFiltersCount}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-52 space-y-4">
            {/* Status Filter */}
            <div>
              <h4 className="font-medium mb-2">Status</h4>
              <div className="space-y-2">
                {Object.values(Status).map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox id={`status-${status}`} checked={selectedStatus.includes(status)} onCheckedChange={() => toggleFilter("status", status)} />
                    <Label htmlFor={`status-${status}`} className="capitalize">
                      {status.replace("_", " ")}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Priority Filter */}
            <div>
              <h4 className="font-medium mb-2">Priority</h4>
              <div className="space-y-2">
                {Object.values(Priority).map((priority) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <Checkbox id={`priority-${priority}`} checked={selectedPriority.includes(priority)} onCheckedChange={() => toggleFilter("priority", priority)} />
                    <Label htmlFor={`priority-${priority}`}>{priority}</Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Sort Button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <BiSort />
              <span className="hidden md:block ml-1">Sort</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-40 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Sort Order</h4>
              <RadioGroup value={sortOrder} onValueChange={handleSortChange} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="asc" id="asc" />
                  <Label htmlFor="asc">Ascending</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="desc" id="desc" />
                  <Label htmlFor="desc">Descending</Label>
                </div>
              </RadioGroup>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Filter;
