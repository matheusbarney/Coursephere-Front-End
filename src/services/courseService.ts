import api from "./api";

export const courseService = {
    getAll: async () => {
        const res = await api.get("/courses");
        return res.data;
    },

    getById: async (id) => {
        const res = await api.get(`/courses/${id}`);
        return res.data;
    },

    deleteById: async (id) => {
        const res = await api.delete(`/courses/${id}`);
        return res.data;
    },

    addCourse: async (courseData) => {
        const response = await api.post('/courses', courseData);
        return response.data;
    },

    editCourse: async (id, courseData) => {
        const response = await api.put(`/courses/${id}`, courseData);
        return response.data;
    },

}