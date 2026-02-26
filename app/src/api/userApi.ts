import { api } from "./api";

export interface User {
    id: number;
    name: string;
    active: boolean;
    tasks?: Task[];
}

export interface Task {
    id: number;
    description: string;
    userId: number;
    status: string;
    date?: string;
    active: boolean;
}

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get("/user");
    return response.data;
};

export const createUser = async (name: string, email: string, password: string): Promise<User> => {
    const response = await api.post("/user", { name, email, password });
    return response.data;
};