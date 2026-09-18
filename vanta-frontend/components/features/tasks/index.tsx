"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { TaskHeader } from "@/components/features/tasks/header";
import { TaskTable, initialTasks } from "@/components/features/tasks/taskTable";
import { TaskSheet } from "./taskSheet";
import { TaskDetailModal } from "../../custom/taskDetailModal";
import { Tasks } from "@/types/task";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function PersonalTasks() {
  const [taskList, setTaskList] = useState<Tasks[]>(initialTasks);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Tasks | undefined>(
    undefined,
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<Tasks | undefined>(
    undefined,
  );

  // Task Detail Modal states
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [selectedDetailTask, setSelectedDetailTask] = useState<
    Tasks | undefined
  >(undefined);

  const onSubmitHandler = (values: Tasks) => {
    if (selectedTask) {
      // Edit mode
      setTaskList((prev) =>
        prev.map((t) => (t.task_id === values.task_id ? values : t)),
      );
      // Synchronize task details modal if active
      if (selectedDetailTask?.task_id === values.task_id) {
        setSelectedDetailTask(values);
      }
      toast.success("Task updated successfully");
    } else {
      // Create mode
      const newTask = {
        ...values,
        id: `T-${taskList.length + 1}`,
      };
      setTaskList((prev) => [...prev, newTask]);
      toast.success("Task created successfully");
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpenSheet(isOpen);
    if (!isOpen) {
      setSelectedTask(undefined);
    }
  };

  const handleDelete = () => {
    if (taskToDelete) {
      setTaskList((prev) =>
        prev.filter((t) => t.task_id !== taskToDelete.task_id),
      );
      if (selectedDetailTask?.task_id === taskToDelete.task_id) {
        setOpenDetail(false);
        setSelectedDetailTask(undefined);
      }
      setOpenDialog(false);
      setTaskToDelete(undefined);
      toast.success("Task deleted successfully");
    }
  };

  return (
    <div>
      <TaskHeader />
      <TaskTable
        data={taskList}
        onView={(task) => {
          setSelectedDetailTask(task);
          setOpenDetail(true);
        }}
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
      <TaskDetailModal
        key={selectedDetailTask?.task_id}
        open={openDetail}
        onOpenChange={setOpenDetail}
        task={selectedDetailTask}
      />
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete !</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {taskToDelete?.title}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="rounded-sm cursor-pointer"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
