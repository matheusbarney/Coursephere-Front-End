import api from "./api";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export const userService = {
    getAll: async () => {
        const res = await api.get<User[]>("/users");
        return res.data;
    },

    getById: async (id) => {
        const res = await api.get<User>(`/users/${id}`);
        return res.data;
    },
    
    addUser: async (userData) => {
        const response = await api.post<User>('/users', userData);
        return response.data;
    },


}