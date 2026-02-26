import { api } from "./api";
import type { Task } from "./userApi";
import { TaskStatuses, type TaskStatus } from "../types/taskStatus";

export interface CreateTaskInput {
    description: string;
    date?: string | null;
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
    data: Partial<{ description: string; status: TaskStatus; date: string | null }>
): Promise<Task> => {
    const response = await api.put(`/task/${id}`, data);
    return response.data;
};

export const updateTaskStatus = async (id: number, status: TaskStatus): Promise<Task> => {
    if (!TaskStatuses.includes(status)) {
        throw new Error("Invalid Status");
    }

    const response = await api.put(`/task/${id}`, { status });
    return response.data;
};

export const deactivateTask = async (id: number): Promise<Task> => {
    const response = await api.patch(`/task/${id}/deactivate`);
    return response.data;
};
