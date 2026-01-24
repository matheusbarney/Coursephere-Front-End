import api from "./api";

interface Course {
    id: string | number;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    creator_id: string | number;
    instructors: string[];
}

export const courseService = {
    getAll: async () => {
        const res = await api.get<Course[]>("/courses");
        return res.data;
    },

    getById: async (id) => {
        const res = await api.get<Course>(`/courses/${id}`);
        return res.data;
    },

    getByUser: async (creator_id) => {
        const res = await api.get<Course[]>(`/courses?creator_id=${creator_id}`);
        return res.data;
    },

    deleteById: async (id) => {
        const res = await api.delete<void>(`/courses/${id}`);
        return res.data;
    },

    addCourse: async (courseData) => {
        const response = await api.post<Course>('/courses', courseData);
        return response.data;
    },

    editCourse: async (id, courseData) => {
        const response = await api.put<Course>(`/courses/${id}`, courseData);
        return response.data;
    },

}