import { api } from "./api";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}

export const loginRequest = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.access_token);
    return response.data;
}

export const registerRequest = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', response.data.access_token);
    return response.data;
}

export const logoutRequest = () => {
    localStorage.removeItem('token');
}