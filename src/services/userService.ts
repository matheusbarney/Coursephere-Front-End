import api from "./api";

interface User {
    id: string | number;
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
    }
}