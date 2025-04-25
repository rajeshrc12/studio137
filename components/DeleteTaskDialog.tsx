"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTasks } from "@/context/TaskContext";

const DeleteTaskDialog = () => {
  const { deleteId, setDeleteId, deleteTask } = useTasks();
  console.log(deleteId);
  if (!deleteId) return;

  const onSubmit = () => {
    deleteTask(deleteId);
    setDeleteId(null);
  };

  return (
    <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
      <DialogContent className="rounded-lg p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Are you sure that you wish to delete this task?</DialogTitle>
        </DialogHeader>
        <div className="flex gap-5 w-full">
          <Button onClick={() => setDeleteId(null)} type="button" variant="outline" className="grow">
            Cancel
          </Button>
          <Button className="grow" onClick={onSubmit}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskDialog;
