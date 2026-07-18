"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { TaskHeader } from "@/components/features/tasks/header";
import { TaskTable } from "@/components/features/tasks/taskTable";
import { TaskSheet } from "./taskSheet";
import { Task } from "@/types/Task";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function PersonalTasks() {
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | undefined>(undefined);

  const onSubmitHandler = (values: Task) => {
    console.log(values);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpenSheet(isOpen);
    if (!isOpen) {
      setSelectedTask(undefined);
    }
  };

  const handleDelete = () => {
    setOpenDialog(false);
    toast.success("Task deleted successfully");
  };

  return (
    <>
      <TaskHeader />
      <TaskTable
        onEdit={(task) => {
          setSelectedTask(task);
          setOpenSheet(true);
        }}
        onDelete={(task) => {
          setOpenDialog(true);
          setTaskToDelete(task);
        }}
      />
      <TaskSheet
        open={openSheet}
        setOpen={handleOpenChange}
        onSubmitHandler={onSubmitHandler}
        task={selectedTask}
      />
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {taskToDelete?.title}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
