import { api } from "../api/api";
import type { Task } from "./userApi";
import { TaskStatuses, type TaskStatus } from "../types/taskStatus";

export interface CreateTaskInput {
    description: string;
    userId: number;
    date?: string;
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await api.get("/task");
    return response.data;
};

export const createTask = async (input: CreateTaskInput): Promise<Task> => {
    const response = await api.post("/task", input);
    return response.data;
};

export const updateTask = async (
    id: number,
    data: Partial<{ description: string; status: string; date: string }>
): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
};

export const updateTaskStatus = async (id: number, status: string): Promise<Task> => {
    if (!TaskStatuses.includes(status as TaskStatus)) {
        throw new Error("Invalid Status");
    }

    const response = await api.put(`/task/${id}`, { status });
    return response.data;
};

export const deactivateTask = async (id: number): Promise<Task> => {
    const response = await api.put(`/task/${id}/deactivate`, { active: false });
    return response.data;
};
