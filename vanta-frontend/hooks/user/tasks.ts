import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TasksResponse,
  Tasks,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "@/types/task";
import api from "@/lib/axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

export const useGetAllTasks = (page: number = 1, limit: number = 10) => {
  return useQuery<TasksResponse>({
    queryKey: ["tasks", page, limit],
    queryFn: async () => {
      const { data } = await api.get(
        `/task/my-tasks?page=${page}&limit=${limit}`,
      );
      return data;
    },
    refetchInterval: 1000 * 60 * 5,
  });
};

export const useCreateTask = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: CreateTaskPayload) => {
      const response = await api.post("/task", task);
      return response.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Task created successfully");
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Failed to create task");
    },
  });
};

export const useUpdateTask = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: UpdateTaskPayload) => {
      const response = await api.put(`/task/${task?.task_id}`, task);
      return response.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Task updated successfully");
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Failed to update task");
    },
  });
};

export const useRemoveTask = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task_id: number) => {
      const response = await api.delete(`/task/${task_id}`);
      return response.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Task deleted successfully");
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Failed to delete task");
    },
  });
};
