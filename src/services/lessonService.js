import api from "./api";

export const lessonService = {
    getAll: async () => {
        const res = await api.get("/lessons");
        return res.data;
    },

    getById: async (id) => {
        const res = await api.get(`/lessons/${id}`);
        return res.data;
    },

    deleteById: async (id) => {
        const res = await api.delete(`/lessons/${id}`);
        return res.data;
    },

    addLesson: async (lessonData) => {
        const response = await api.post('/lessons', lessonData);
        return response.data;
    },

    editLesson: async (id, lessonData) => {
        const response = await api.put(`/lessons/${id}`, lessonData);
        return response.data;
    },

}