import api from "./api";

export const userService = {
    getAll: async () => {
        const res = await api.get("/users");
        return res.data;
    },

    getById: async (id) => {
        const res = await api.get(`/users/${id}`);
        return res.data;
    }
}