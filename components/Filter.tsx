"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Priority, Status } from "@/types/task";
import { useTasks } from "@/context/TaskContext";

const Filter = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { filterTasks } = useTasks();

  const toggleFilter = (type: "status" | "priority", value: string) => {
    if (type === "status") {
      const updatedStatus = selectedStatus.includes(value) ? selectedStatus.filter((v) => v !== value) : [...selectedStatus, value];
      setSelectedStatus(updatedStatus);
      filterTasks({ action: "status", payload: updatedStatus });
    } else {
      const updatedPriority = selectedPriority.includes(value) ? selectedPriority.filter((v) => v !== value) : [...selectedPriority, value];
      setSelectedPriority(updatedPriority);
      filterTasks({ action: "priority", payload: updatedPriority });
    }
  };

  const handleSortChange = (value: "asc" | "desc") => {
    setSortOrder(value);
    filterTasks({ action: value, payload: value });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Filter Button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Filter</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-40 space-y-4">
          <div>
            <h4 className="font-medium mb-2">Status</h4>
            <div className="space-y-2">
              {Object.values(Status).map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox id={`status-${status}`} checked={selectedStatus.includes(status)} onCheckedChange={() => toggleFilter("status", status)} />
                  <Label htmlFor={`status-${status}`} className="capitalize">
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

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
          <Button variant="outline">Sort</Button>
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
  );
};

export default Filter;
