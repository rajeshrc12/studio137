"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTasks } from "@/context/TaskContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Priority, Status } from "@/types/task";
import { FaPlus } from "react-icons/fa6";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
});

type TaskFormValues = z.infer<typeof formSchema>;

const AddTaskDialog = () => {
  const { addTask } = useTasks();
  const [open, setOpen] = useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    addTask({
      ...data,
      id: uuidv4(),
      priority: Priority.LOW,
      status: Status.IN_PROGRESS,
    });
    form.reset(); // optional: reset form fields
    setOpen(false); // close dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <FaPlus color="#ffffff" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="h-[150px]" placeholder="Task description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Due Date</FormLabel>
                  <FormControl className="w-full">
                    <Input className="w-full" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              {" "}
              <Button type="button" variant="outline" className="grow-1" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button className="grow-1" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
